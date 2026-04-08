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

type Admin = {
  firstname: string;
  lastname: string;
  email: string;
};

type AdminAuthContextType = {
  adminSignup: (data: SignupParams) => Promise<void>;
  adminLogin: (data: LoginParams) => Promise<void>;
  token: string | null;
  admin: Admin | null;
};

const AdminAuthContext = createContext<AdminAuthContextType | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3001/api/v1/admin/me", {
          headers: { Authorization: token },
        })
        .then((res) => setAdmin(res.data.admin));
    }
  }, []);

  async function adminSignup(data: SignupParams) {
    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/admin/signup",
        {
          firstName: data.firstname,
          lastName: data.lastname,
          email: data.email,
          password: data.password,
        },
      );

      console.log("Signup success:", res.data);
    } catch (err) {
      console.error("Signup error:", err);
    }
  }

  async function adminLogin(data: LoginParams) {
    try {
      const res = await axios.post("http://localhost:3001/api/v1/admin/login", {
        email: data.email,
        password: data.password,
      });

      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);

      if (res.data.findAdmin) {
        setAdmin(res.data.findAdmin);
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  }

  return (
    <AdminAuthContext.Provider
      value={{ adminSignup, adminLogin, token, admin }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAut() {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
