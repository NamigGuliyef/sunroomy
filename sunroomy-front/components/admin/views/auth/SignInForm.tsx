"use client";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaGithub } from "react-icons/fa6";
export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      errors: {},
    },
  });
  const router = useRouter();
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    signIn("credentials", {
      ...data,
      redirect: false,
      callbackUrl: "/admin/dashboard",
    }).then((res) => {
      if (res?.status === 401) {
        setIsLoading(false);
        toast.error("Invalid credentials");
      } else if (res?.status === 200) {
        setIsLoading(false);
        toast.success("Successfully logged in!");
        router.push("/admin/dashboard");
        router.refresh();
      }
    });
  };
  return (
    <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email", { required: true })}
        isDisabled={isLoading}
        label="Email"
        errorMessage={errors.email && "Please enter a valid email"}
        type="email"
        name="email"
        size="md"
        id="email"
        variant="underlined"
        placeholder="Enter your email"
      />
      <Input
        isDisabled={isLoading}
        {...register("password", { required: true })}
        errorMessage={errors.password && "Please enter a valid password"}
        label="Password"
        id="password"
        variant="underlined"
        name="password"
        type="password"
        size="md"
        placeholder="Enter your password"
      />
      <Button
        isLoading={isLoading}
        type="submit"
        variant="shadow"
        size="md"
        color="primary"
      >
        Submit
      </Button>
      {/* <Button
        isLoading={isLoading}
        onClick={handleGithub}
        variant="shadow"
        size="md"
        color="primary">
        <FaGithub fontSize={20} /> Sign in with GitHub
      </Button> */}
    </form>
  );
}
