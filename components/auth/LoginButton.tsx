"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import LoginForm from "./LoginForm";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  asChild,
  mode = "redirect",
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LoginButton;
