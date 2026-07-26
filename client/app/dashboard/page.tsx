"use client";

import Loading from "@/components/loading";
import { useLoading } from "../context/LoadingContext";
import { usePathname } from "next/navigation";
import Courses from "./courses/page";

export default function Dashboard() {
  const { loading } = useLoading();
  const pathname = usePathname();

  if (loading) {
    return <Loading />;
  }
  if (pathname === "/dashboard/courses") {
    return <Courses />;
  }
}
