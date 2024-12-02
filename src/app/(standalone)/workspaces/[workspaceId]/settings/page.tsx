import { getCurrent } from "@/features/auth/queries";
import EditWorkspaceForm from "@/features/workspaces/components/edit-workspace-form";
import { getWorkspace } from "@/features/workspaces/queries";
import { redirect } from "next/navigation";

interface WorkspaceIdSettingPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdSettingPage = async ({
  params,
}: WorkspaceIdSettingPageProps) => {
  const user = await getCurrent();

  if (!user) {
    redirect("/sign-in");
  }

  const initialValues = await getWorkspace({ workspaceId: params.workspaceId });

  return (
    <div className="w-full lg:max-w-xl">
      <EditWorkspaceForm {...{ initialValues }} />
    </div>
  );
};

export default WorkspaceIdSettingPage;
