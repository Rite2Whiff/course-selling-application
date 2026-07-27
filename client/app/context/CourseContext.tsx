"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Course } from "../types/auth";
import axios from "axios";
import { useAuth } from "./AuthContext";

type CourseContext = {
  courses: Course[] | null;
  getCourses: () => void;
};

const CourseContext = createContext<CourseContext | null>(null);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[] | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    console.log(user);
    if (user) {
      getCourses();
    }
  }, [user]);

  async function getCourses() {
    const response = await axios.get("http://localhost:3001/courses", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setCourses(response.data.courses);
  }

  return (
    <CourseContext.Provider
      value={{
        courses,
        getCourses,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used withing the CourseProvider");
  }
  return context;
}
