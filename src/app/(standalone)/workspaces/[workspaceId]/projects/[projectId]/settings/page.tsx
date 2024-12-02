import { getCurrent } from "@/features/auth/queries";
import EditProjectForm from "@/features/projects/components/edit-project-form";
import { getProject } from "@/features/projects/queries";
import { redirect } from "next/navigation";
import React from "react";

interface ProjectIdSettingsPageProps {
  params: {
    projectId: string;
  };
}

const ProjectIdSettingsPage = async ({
  params,
}: ProjectIdSettingsPageProps) => {
  const user = await getCurrent();

  if (!user) redirect("/sign-in");

  const initialValues = await getProject({ projectId: params.projectId });

  if (!initialValues) redirect(`/projects/${params.projectId}`);

  return (
    <div className="w-full lg:max-w-lg">
      <EditProjectForm {...{ initialValues }} />
    </div>
  );
};

export default ProjectIdSettingsPage;
