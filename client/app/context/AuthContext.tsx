"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Creator, User } from "../types/auth";
import axios, { AxiosResponse } from "axios";
import { useLoading } from "./LoadingContext";

type AuthContextType = {
  user: User | null;
  creator: Creator | null;
  signup: (
    username: string,
    email: string,
    password: string,
  ) => Promise<AxiosResponse>;
  login: (username: string, password: string) => Promise<AxiosResponse>;
  creatorSignup: (
    username: string,
    email: string,
    password: string,
  ) => Promise<AxiosResponse>;
  creatorLogin: (username: string, passwrod: string) => Promise<AxiosResponse>;
  userRole: "user" | "creator" | null;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [creator, setCreator] = useState<Creator | null>(null);
  const [userRole, setUserRole] = useState<"user" | "creator" | null>(null);

  const { setLoading } = useLoading();

  useEffect(() => {
    async function checkAuth() {
      const role = localStorage.getItem("userRole");
      if (role === "user") {
        const response = await axios.get("http://localhost:3001/user/me", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setUser(response.data.user);
        setUserRole("user");
      } else {
        const response = await axios.get("http://localhost:3001/creator/me", {
          headers: { Authorization: localStorage.getItem("token") },
        });
        setCreator(response.data.creator);
        setUserRole("creator");
      }
      setLoading(false);
    }

    if (localStorage.getItem("token")) {
      checkAuth();
    }
  }, [setLoading]);

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
    localStorage.setItem("userRole", "user");
    setUserRole("user");
    setUser(response.data.user);
    setLoading(false);
    return response;
  }

  async function creatorSignup(
    username: string,
    email: string,
    password: string,
  ) {
    const response = await axios.post("http://localhost:3001/creator/signup", {
      username,
      email,
      password,
    });

    return response;
  }

  async function creatorLogin(username: string, password: string) {
    const response = await axios.post("http://localhost:3001/creator/login", {
      username,
      password,
    });
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("userRole", "creator");
    setUserRole("creator");
    setCreator(response.data.creator);
    setLoading(false);
    return response;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        creator,
        creatorSignup,
        creatorLogin,
        userRole,
      }}
    >
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
