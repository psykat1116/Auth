"use client";

import { useCurrentRole } from "@/hook/useCurrentRole";
import { UserRole } from "@prisma/client";
import FormError from "../FormError";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRole: UserRole;
}

const RoleGate: React.FC<RoleGateProps> = ({ children, allowedRole }) => {
  const role = useCurrentRole();

  if (role !== allowedRole) {
    return (
      <FormError message="You Don't Have Permission To View This Content" />
    );
  }

  return <>{children}</>;
};

export default RoleGate;
