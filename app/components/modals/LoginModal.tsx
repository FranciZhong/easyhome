"use client";

import useLoginModalStore from "@/app/stores/useLoginModalStore";
import useRegisterModalStore from "@/app/stores/useRegisterModalStore";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

const LoginModal = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const loginModalStore = useLoginModalStore();
  const registerModalStore = useRegisterModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitForm: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    const res = await signIn("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.ok) {
      toast.info("Successfully sign in");
      console.log("Successfully sign in");

      router.refresh();
      loginModalStore.onClose();
    } else {
      toast.error("Wrong email or password");
      console.error(`Sign in error ${res?.error}`);
    }

    setIsLoading(false);
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Log in with your email." />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div
      className="
        pt-3
        flex
        flex-col
        gap-3
      "
    >
      <Button
        label="Sign in with Google"
        outline
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        label="Sign in with Github"
        outline
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="pt-2 flex flex-row items-start gap-3">
        <span className="text-neutral-500">Don't have an account?</span>
        <span
          className="text-neutral-800 font-semibold hover:underline"
          onClick={() => {
            registerModalStore.onOpen();
            loginModalStore.onClose();
          }}
        >
          Sign up
        </span>
      </div>
    </div>
  );

  return (
    <Modal
      title="Log in"
      body={bodyContent}
      footer={footerContent}
      isOpen={loginModalStore.isOpen}
      onClose={loginModalStore.onClose}
      onSubmit={handleSubmit(submitForm)}
      actionLabel="Sign in"
    />
  );
};

export default LoginModal;
