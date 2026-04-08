"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";

import { useUserAuth } from "../context/UserAuthContext";
import { useAdminAut } from "../context/AdminAuthContext";
import { useEffect } from "react";

const signupSchema = z.object({
  firstname: z
    .string()
    .min(3, "Firstname must be at least 3 characters.")
    .max(10, "Firsname must be at most 10 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ),
  lastname: z
    .string()
    .min(3, "Lastname must be at least 3 characters.")
    .max(10, "Lastname must be at most 10 characters.")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores.",
    ),
  email: z
    .string()
    .min(3, "Email must be at least 3 characters.")
    .max(250, "Email must be at most 250 characters.")
    .email(),
  password: z
    .string()
    .min(3, "Password must be at least 3 characters.")
    .max(10, "Password must be at most 10 characters."),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3).max(10),
});

type FormSchema = {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
};

export function AuthForm() {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
      return;
    }
  }, []);

  const pathname = usePathname();
  const { userSignup, userLogin } = useUserAuth();
  const { adminSignup, adminLogin } = useAdminAut();

  const form = useForm<FormSchema>({
    resolver: zodResolver(
      pathname.includes("/login") ? loginSchema : signupSchema,
    ),
    defaultValues:
      pathname === "/login"
        ? {
            email: "",
            password: "",
          }
        : {
            email: "",
            password: "",
            firstname: "",
            lastname: "",
          },
  });

  async function onSubmit(data: FormSchema) {
    if (pathname.includes("/user")) {
      if (pathname.includes("/signup")) {
        await userSignup(data);
      } else {
        await userLogin(data);
        console.log("you have successfully logged in");
      }
    } else {
      if (pathname.includes("/admin")) {
        await adminSignup(data);
      } else {
        await adminLogin(data);
      }
    }
    toast("You submitted the following values:", {
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2",
      },
      style: {
        "--border-radius": "calc(var(--radius)  + 4px)",
      } as React.CSSProperties,
    });
  }

  return (
    <Card className="min-w-full sm:max-w-md">
      <CardContent>
        <form
          className="flex flex-col gap-4"
          id="form-rhf-input"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup
            className={`${pathname.includes("/login") ? "hidden" : null}`}
          >
            <Controller
              name="firstname"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-username">
                    Firstname
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-firstname"
                    aria-invalid={fieldState.invalid}
                    placeholder="Richie"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup
            className={`${pathname.includes("/login") ? "hidden" : null}`}
          >
            <Controller
              name="lastname"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-lastname">
                    Lastname
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-lastname"
                    aria-invalid={fieldState.invalid}
                    placeholder="Rich"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="abc@gmail.com"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-password">
                    Password
                  </FieldLabel>
                  <Input
                    type="password"
                    {...field}
                    id="form-rhf-input-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="password"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-rhf-input">
            {`${pathname.includes("/login") ? "Login" : "Signup"}`}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
