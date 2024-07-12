"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useCurrentUser } from "@/hook/useCurrentUser";

const Page = () => {
  const user = useCurrentUser();
  return (
    <div className="bg-white p-10 rounded-xl">
      <button type="submit" onClick={() => signOut()}>
        Sign Out
      </button>
    </div>
  );
};

export default Page;
