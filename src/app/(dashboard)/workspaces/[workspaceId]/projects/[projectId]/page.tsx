import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import { ProductIdClient } from "./client";

const ProjectIdPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <ProductIdClient />;
};

export default ProjectIdPage;
