export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  creatorId: number;
}
