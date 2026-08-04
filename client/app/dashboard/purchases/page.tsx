"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useLoading } from "@/app/context/LoadingContext";
import Loading from "@/components/loading";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect } from "react";

export default function Courses() {
  const { user } = useAuth();
  const { loading } = useLoading();

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl self-center">Courses</h2>
        <div className="grid grid-cols-3 gap-3">
          {user && user.courses.length > 0 ? (
            user.courses.map((course) => {
              return (
                <Card key={course.id}>
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                    <CardDescription>{course.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-xl">$ {course.price}</p>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <Loading />
          )}
        </div>
      </div>
    );
  }
}
