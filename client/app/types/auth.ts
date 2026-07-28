export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  purchases: Purchase[];
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
