"use client";

import Loading from "@/components/loading";
import { useLoading } from "../context/LoadingContext";
import { usePathname } from "next/navigation";
import Courses from "./courses/page";
import Purchases from "./purchases/page";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const { loading } = useLoading();
  const pathname = usePathname();
  console.log(user);

  if (loading) {
    return <Loading />;
  }
  if (pathname === "/dashboard/courses") {
    return <Courses />;
  }
  if (pathname === "/dashboard/purchases") {
    return <Purchases />;
  }
}
