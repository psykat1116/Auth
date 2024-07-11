import CardWrapper from "@/components/auth/CardWrapper";
import { AlertTriangle } from "lucide-react";

const ErrorCard = () => {
  return (
    <CardWrapper
      headerLabel="Oops! Something Went Wrong!"
      backButtonHref="/auth/login"
      backButtonLabel="Back To Login"
    >
      <div className="w-full items-center flex">
        <AlertTriangle className="text-destructive" />
        <p className="text-lg font-semibold text-destructive ml-2">
          There was an error processing your request.
        </p>
      </div>
    </CardWrapper>
  );
};

export default ErrorCard;
