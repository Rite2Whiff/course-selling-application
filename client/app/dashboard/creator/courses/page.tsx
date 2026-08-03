"use client";

import { useAuth } from "@/app/context/AuthContext";
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

export default function CreatorCourses() {
  const { creator } = useAuth();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl self-center">Courses</h2>
      <div
        className={`${creator?.courses && creator?.courses.length > 0 ? "grid grid-cols-3 gap-3" : ""}`}
      >
        {creator?.courses && creator.courses.length > 0 ? (
          creator.courses.map((course) => {
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
          <p className="">No Courses found</p>
        )}
      </div>
    </div>
  );
}
