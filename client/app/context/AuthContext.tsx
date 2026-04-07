"use client";

import axios from "axios";
import { createContext, useContext, useState, ReactNode } from "react";

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
  firstname: string;
  lastname: string;
  email: string;
};

type AuthContextType = {
  signup: (data: SignupParams) => Promise<void>;
  login: (data: LoginParams) => Promise<void>;
  token: string | null;
  user: User | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  async function signup(data: SignupParams) {
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

  async function login(data: LoginParams) {
    try {
      const res = await axios.post("http://localhost:3001/api/v1/user/login", {
        email: data.email,
        password: data.password,
      });

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      if (res.data.user) {
        setUser(res.data.user);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  }

  return (
    <AuthContext.Provider value={{ signup, login, token, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
