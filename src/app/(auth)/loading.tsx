"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangleIcon, LoaderIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const LoadingPage = () => {
  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <LoaderIcon className="size-6 animate-spin text-muted-foreground" />
    </div>
  );
};

export default LoadingPage;
