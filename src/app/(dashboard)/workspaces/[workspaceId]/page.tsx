import { getCurrent } from "@/features/auth/queries";
import { getWorkspace } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";
import React from "react";

interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = async ({ params }: WorkspaceIdPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  const workspace = await getWorkspace({ workspaceId: params.workspaceId });

  return <div>WorkspaceIdPage {JSON.stringify(workspace)}</div>;
};

export default WorkspaceIdPage;
