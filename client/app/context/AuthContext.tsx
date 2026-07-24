"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/auth";
import axios, { AxiosResponse } from "axios";

type AuthContextType = {
  user: User | null;
  signup: (
    username: string,
    email: string,
    password: string,
  ) => Promise<AxiosResponse>;
  login: (username: string, password: string) => Promise<AxiosResponse>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkAuth() {
      const response = await axios.get("http://localhost:3001/user/me", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      setUser(response.data.user);
    }

    checkAuth();
  }, []);

  async function signup(username: string, email: string, password: string) {
    const response = await axios.post("http://localhost:3001/user/signup", {
      username,
      email,
      password,
    });

    return response;
  }

  async function login(username: string, password: string) {
    const response = await axios.post("http://localhost:3001/user/login", {
      username,
      password,
    });
    localStorage.setItem("token", response.data.token);
    setUser(response.data.user);
    return response;
  }

  return (
    <AuthContext.Provider value={{ user, login, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used with the AuthProvider");
  }
  return context;
}
