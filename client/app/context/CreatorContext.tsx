"use client";
import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { Course } from "../types/auth";
import { useLoading } from "./LoadingContext";

type CreatorContext = {
  creatorCourses: Course[] | null;
  getCreatorCourses: () => void;
  addCourse: (title: string, description: string, price: number) => void;
  editCourse: () => void;
  deleteCourse: () => void;
  setCreatorCourses: React.Dispatch<React.SetStateAction<Course[] | null>>;
};

const CreatorContext = createContext<CreatorContext | null>(null);

export function CreatorProvider({ children }: { children: React.ReactNode }) {
  const [creatorCourses, setCreatorCourses] = useState<Course[] | null>(null);
  const { setLoading } = useLoading();

  async function getCreatorCourses() {
    const response = await axios.get("http://localhost:3001/creator/courses", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    setLoading(false);
    setCreatorCourses(response.data.courses);
  }

  async function addCourse(title: string, description: string, price: number) {
    const response = await axios.post(
      "http://localhost:3001/creator/course",
      { title, description, price },
      { headers: { Authorization: localStorage.getItem("token") } },
    );
    console.log(response.data);
  }

  async function editCourse() {}

  async function deleteCourse() {}

  return (
    <CreatorContext.Provider
      value={{
        getCreatorCourses,
        addCourse,
        editCourse,
        deleteCourse,
        creatorCourses,
        setCreatorCourses,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
}

export function useCreator() {
  const context = useContext(CreatorContext);

  if (!context) {
    throw new Error("useCreator must be used inside of the CreatorProvider");
  }

  return context;
}
