import axios from "axios";
import { useContext, createContext } from "react";

type CreatorContext = {
  getCreatorCourses: () => void;
  addCourse: (title: string, description: string, price: number) => void;
  editCourse: () => void;
  deleteCourse: () => void;
};

const CreatorContext = createContext<CreatorContext | null>(null);

export function CreatorProvider({ children }: { children: React.ReactNode }) {
  async function getCreatorCourses() {
    const response = await axios.get("http://localhost:3001/creator/courses", {
      headers: { Authorization: localStorage.getItem("token") },
    });
    console.log(response.data);
  }

  async function addCourse(title: string, description: string, price: number) {
    const response = await axios.post(
      "http://localhost:3001/creator/course",
      { title, description, price },
      { headers: { Authorization: localStorage.getItem("token") } },
    );
    console.log(response);
  }

  async function editCourse() {}

  async function deleteCourse() {}

  return (
    <CreatorContext.Provider
      value={{ getCreatorCourses, addCourse, editCourse, deleteCourse }}
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
