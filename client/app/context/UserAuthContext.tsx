"use client";

import axios from "axios";
import { convertSegmentPathToStaticExportFilename } from "next/dist/shared/lib/segment-cache/segment-value-encoding";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type SignupParams = {
  firstname?: string;
  lastname?: string;
  email: string;
  password: string;
};

type LoginParams = {
  email: string;
  password: string;
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type UserAuthContextType = {
  userSignup: (data: SignupParams) => Promise<void>;
  userLogin: (data: LoginParams) => Promise<void>;
  token: string | null;
  user: User | null;
  isLoading: boolean;
};

const UserAuthContext = createContext<UserAuthContextType | null>(null);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await axios.get(
          "http://localhost:3001/api/v1/user/me",
          {
            headers: { Authorization: token },
          },
        );
        setUser(response.data.user);
        setIsLoading(false);
      }
    }
    fetchUser();
  }, []);

  async function userSignup(data: SignupParams) {
    try {
      const res = await axios.post("http://localhost:3001/api/v1/user/signup", {
        firstName: data.firstname,
        lastName: data.lastname,
        email: data.email,
        password: data.password,
      });

      console.log("Signup success:", res.data);
    } catch (err) {
      console.error("Signup error:", err);
    }
  }

  async function userLogin(data: LoginParams) {
    try {
      const res = await axios.post("http://localhost:3001/api/v1/user/login", {
        email: data.email,
        password: data.password,
      });

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      if (res.data.findUser) {
        setUser(res.data.findUser);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  }

  return (
    <UserAuthContext.Provider
      value={{ userSignup, userLogin, token, user, isLoading }}
    >
      {children}
    </UserAuthContext.Provider>
  );
}

export function useUserAuth() {
  const context = useContext(UserAuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
