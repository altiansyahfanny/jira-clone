"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col gap-y-4">
      <AlertTriangleIcon className="size-6 text-muted-foreground" />
      <p className="text-sm text-muted-foreground">Something went wrong</p>
      <Button variant={"secondary"} asChild>
        <Link href={"/"}>Back to home</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;