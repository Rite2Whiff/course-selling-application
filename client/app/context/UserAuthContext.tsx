"use client";

import axios from "axios";
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
  firstname: string;
  lastname: string;
  email: string;
};

type UserAuthContextType = {
  userSignup: (data: SignupParams) => Promise<void>;
  userLogin: (data: LoginParams) => Promise<void>;
  token: string | null;
  user: User | null;
};

const UserAuthContext = createContext<UserAuthContextType | null>(null);

export function UserAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3001/api/v1/user/me", {
          headers: { Authorization: token },
        })
        .then((res) => setUser(res.data.user));
    }
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
    <UserAuthContext.Provider value={{ userSignup, userLogin, token, user }}>
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
