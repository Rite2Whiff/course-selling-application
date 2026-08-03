export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  courses: Course[];
  isCreator: boolean;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  creatorId: number;
}

export interface Purchase {
  id: number;
  userId: number;
  courseId: number;
  course: Course;
}

export interface Creator {
  id: number;
  username: string;
  password: string;
}

export interface Creator extends Omit<User, "isCreator"> {
  courses: Course[];
}
