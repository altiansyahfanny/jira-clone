"use client";

import React, { Fragment } from "react";
import { useWorkspaceId } from "../hooks/use-workspace-id";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, LoaderIcon, MoreVerticalIcon } from "lucide-react";
import Link from "next/link";
import { DottedSeparator } from "@/components/dotted-separator";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { MemberAvatar } from "@/features/members/componentes/member-avatar";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteMember } from "@/features/members/api/use-delete-member";
import { useUpdateMember } from "@/features/members/api/use-update-member";
import { MemberRole } from "@/features/members/types";
import { useConfirm } from "@/hooks/use-confirm";

export const MembersList = () => {
  const workspaceId = useWorkspaceId();
  const [ConfirmDialog, confirm] = useConfirm(
    "Remove member",
    "This member will be removed from the workspace",
    "destructive"
  );

  const { data, isLoading } = useGetMembers({ workspaceId });
  const { mutate: deleteMember, isPending: isDeletingMember } =
    useDeleteMember();
  const { mutate: updateMember, isPending: isUpdatingMember } =
    useUpdateMember();

  const handleUpdateMember = (memberId: string, role: MemberRole) => {
    updateMember({ param: { memberId }, json: { role } });
  };
  const handleDeleteMember = async (memberId: string) => {
    const ok = await confirm();
    if (!ok) return;

    deleteMember(
      { param: { memberId } },
      {
        onSuccess: () => {
          window.location.reload();
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <ConfirmDialog />
      <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
        <Button asChild variant={"secondary"} size={"sm"}>
          <Link href={`/workspaces/${workspaceId}`}>
            <ArrowLeftIcon className="size-4 mr-2" /> Back
          </Link>
        </Button>
        <CardTitle className="text-xl font-bold">Members List</CardTitle>
      </CardHeader>
      <div className="px-7">
        <DottedSeparator />
      </div>
      <CardContent className="p-7">
        {isLoading ? (
          <div className="flex justify-center">
            <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <div>
            {data?.documents.map((member, index) => (
              <Fragment key={member.$id}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MemberAvatar
                      name={member.name}
                      className="size-10"
                      fallbackClassName="text-lg"
                    />
                    <div className="flex flex-col">
                      <p className="text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button
                        className="ml-auto"
                        variant="secondary"
                        size={"icon"}
                      >
                        <MoreVerticalIcon className="size-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side="bottom" align="end">
                      <DropdownMenuItem
                        className="font-medium"
                        onClick={() => {
                          handleUpdateMember(member.$id, MemberRole.ADMIN);
                        }}
                        disabled={false}
                      >
                        Set as Administator
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="font-medium"
                        onClick={() => {
                          handleUpdateMember(member.$id, MemberRole.MEMBER);
                        }}
                        disabled={false}
                      >
                        Set as Member
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="font-medium text-amber-700"
                        onClick={() => {
                          handleDeleteMember(member.$id);
                        }}
                        disabled={false}
                      >
                        Remove {member.name}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {index < data.documents.length - 1 && (
                  <Separator className="my-2.5" />
                )}
              </Fragment>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
