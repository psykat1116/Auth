"use client";
import React from "react";
import UserInfo from "@/components/Protected/UserInfo";
import { useCurrentUser } from "@/hook/useCurrentUser";

const Page = () => {
  const user = useCurrentUser();
  return <UserInfo label="Client Component" user={user} />;
};

export default Page;
