"use client";

import useLoginModalStore from "@/app/stores/useLoginModalStore";
import useRegisterModalStore from "@/app/stores/useRegisterModalStore";
import { catchClientError } from "@/app/utils/httpHandler";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import Button from "../Button";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Modal from "./Modal";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const registerModalStore = useRegisterModalStore();
  const loginModalStore = useLoginModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const submitForm: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    await catchClientError(
      () => {
        return axios.post("/api/auth/register", data);
      },
      (data) => {
        registerModalStore.onClose();
        loginModalStore.onOpen();
      },
      (err) => {},
      () => {
        setIsLoading(false);
      },
    );
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Easy Home"
        subtitle="Sign up with your email as a new member!"
      />
      <Input
        id="name"
        label="Full Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
        label="Continue with Google"
        outline
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <Button
        label="Continue with Github"
        outline
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="pt-2 flex flex-row items-start gap-3">
        <span className="text-neutral-500">Already a member?</span>
        <span
          className="text-neutral-800 font-semibold hover:underline"
          onClick={() => {
            registerModalStore.onClose();
            loginModalStore.onOpen();
          }}
        >
          Log in
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <Modal
        title="Sign up"
        body={bodyContent}
        footer={footerContent}
        isOpen={registerModalStore.isOpen}
        actionLabel="Sign up"
        onSubmit={handleSubmit(submitForm)}
        onClose={registerModalStore.onClose}
      />
    </div>
  );
};

export default RegisterModal;
