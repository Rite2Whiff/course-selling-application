"use client";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from "react";
import { useAuth } from "@/app/context/AuthContext";
import { toast } from "sonner";

export default function Login() {
  const { login } = useAuth();
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const response = await login(username, password);
    console.log(response.data);
    toast(response.data.message, { position: "top-center" });
  }

  return (
    <FieldSet className="w-full max-w-lg rounded-2xl shadow-xl p-8">
      <form onSubmit={handleSubmit}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="fieldgroup-username">Username</FieldLabel>
            <Input
              id="fieldgroup-username"
              placeholder="Jordan Lee"
              name="username"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="fieldgroup-password">Password</FieldLabel>
            <Input
              id="fieldgroup-password"
              type="password"
              placeholder="Jordan123"
              name="password"
            />
          </Field>
          <Field orientation="horizontal">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">Submit</Button>
          </Field>
        </FieldGroup>
      </form>
    </FieldSet>
  );
}
