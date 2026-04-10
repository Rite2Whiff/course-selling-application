"use client";

import { useUserAuth } from "@/app/context/UserAuthContext";

function UserDashboard() {
  const { user } = useUserAuth();

  return <>Hi {user?.firstName}</>;
}

export default UserDashboard;
