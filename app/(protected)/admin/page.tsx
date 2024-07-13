"use client";
import { admin } from "@/action/admin";
import FormSuccess from "@/components/FormSuccess";
import RoleGate from "@/components/Protected/RoleGate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useCurrentRole } from "@/hook/useCurrentRole";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const Page = () => {
  const onServerActionClick = async () => {
    admin().then((data) => {
      if (data.success) {
        toast.success(data.success);
      }
      if (data.error) {
        toast.error(data.error);
      }
    });
  };
  const onApiRouteClick = async () => {
    fetch("/api/admin").then((res) => {
      if (res.ok) {
        toast.success("Allowed API Route");
      } else {
        console.error("Forbidden API Route");
      }
    });
  };
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Admin</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You Are Allowed To See This Content" />
        </RoleGate>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin Only API Route</p>
          <Button onClick={onApiRouteClick}>Click To Test</Button>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-md">
          <p className="text-sm font-medium">Admin Only Server Action</p>
          <Button onClick={onServerActionClick}>Click To Test</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
