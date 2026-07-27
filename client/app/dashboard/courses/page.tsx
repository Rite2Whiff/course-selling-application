"use client";

import { useCourse } from "@/app/context/CourseContext";
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

export default function Courses() {
  const { courses } = useCourse();
  console.log(courses);
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl self-center">Courses</h2>
      <div className="grid grid-cols-3 gap-3">
        {courses ? (
          courses.map((course) => {
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
