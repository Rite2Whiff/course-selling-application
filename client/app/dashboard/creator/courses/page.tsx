"use client";

import { useAuth } from "@/app/context/AuthContext";
import { useCreator } from "@/app/context/CreatorContext";
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
import axios from "axios";
import { useEffect } from "react";

export default function CreatorCourses() {
  const { creatorCourses, setCreatorCourses } = useCreator();

  useEffect(() => {
    async function fetchCreatorCourses() {
      if (localStorage.getItem("userRole") === "creator") {
        const response = await axios.get(
          "http://localhost:3001/creator/courses",
          { headers: { Authorization: localStorage.getItem("token") } },
        );
        setCreatorCourses(response.data.courses);
      }
    }

    fetchCreatorCourses();
  }, [setCreatorCourses]);

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl self-center">Courses</h2>
      <div
        className={`${creatorCourses && creatorCourses?.length > 0 ? "grid grid-cols-3 gap-3" : ""}`}
      >
        {creatorCourses && creatorCourses.length > 0 ? (
          creatorCourses.map((course) => {
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
