"use client";
import { useAuth } from "@/app/context/AuthContext";

export default function Courses() {
  const { user } = useAuth();
  console.log(user);
  return (
    <div className="flex justify-center ">
      <h2 className="text-2xl">Courses</h2>
      <div></div>
    </div>
  );
}
