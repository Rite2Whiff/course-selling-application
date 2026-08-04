"use client";
import { newCourseSchema } from "@/schemas/Course";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldError,
  FieldGroup,
} from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useCreator } from "@/app/context/CreatorContext";
import { toast } from "sonner";

function FormRhfInput() {
  const form = useForm<z.infer<typeof newCourseSchema>>({
    resolver: zodResolver(newCourseSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });

  return form;
}

export default function AddCourse() {
  const form = FormRhfInput();
  const router = useRouter();
  const { addCourse } = useCreator();

  async function onSubmit(data: z.infer<typeof newCourseSchema>) {
    const { title, description, price } = data;
    addCourse(title, description, price);
    toast("course successfully created", { position: "top-center" });
    router.push("/dashboard/creator/courses");
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Add a new course</CardTitle>
        <CardDescription>
          Fill in the details below to add a new course
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="form-rhf-input" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-username">
                    Title
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Frontend Development"
                    autoComplete="title"
                  />
                  <FieldDescription>This is your course title</FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-description">
                    Description
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-rhf-input-description"
                    aria-invalid={fieldState.invalid}
                    placeholder="A deep dive into the world of Frontend Development"
                    autoComplete="description"
                  />
                  <FieldDescription>
                    This is your course description
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
          <FieldGroup>
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="form-rhf-input-price">Price</FieldLabel>
                  <Input
                    type="number"
                    {...field}
                    {...form.register("price", {
                      valueAsNumber: true,
                    })}
                    id="form-rhf-input-price"
                    aria-invalid={fieldState.invalid}
                    placeholder="500"
                    autoComplete="price"
                  />
                  <FieldDescription>This is your course price</FieldDescription>
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
            Add
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
