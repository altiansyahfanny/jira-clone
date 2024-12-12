import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";

interface WorkspaceIdPageProps {
  params: {
    workspaceId: string;
  };
}

const WorkspaceIdPage = async ({ params }: WorkspaceIdPageProps) => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return (
    <div className="bg-blue-500">
      <h1 className="bg-transparent">Workspace page</h1>
    </div>
  );
};

export default WorkspaceIdPage;
