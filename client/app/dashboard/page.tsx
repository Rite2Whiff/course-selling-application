"use client";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  console.log(user);
  return <h1>hi {user?.username}</h1>;
}
