"use client";
import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { BeatLoader } from "react-spinners";

import CardWrapper from "@/components/auth/CardWrapper";
import { newVerification } from "@/action/Verification";
import FormError from "@/components/FormError";
import FormSuccess from "@/components/FormSuccess";

const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (error || success) return;
    if (!token) {
      setError("Token Does Not Exist");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something Went Wrong");
      });
  }, [token, error, success]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerLabel="Confim Your Verification"
      backButtonHref="/auth/login" 
      backButtonLabel="Back To Login"
    >
      <div className="flex flex-col items-center w-full justify-end">
        {!error && !success && <BeatLoader />}
        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};

export default NewVerificationForm;
