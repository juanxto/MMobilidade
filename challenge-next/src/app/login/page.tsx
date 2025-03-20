"use client";
import { useRouter } from "next/navigation";
import { routes } from "@/routes";
import { useState } from "react";
import Image from "next/image";
import Head from "next/head";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    setTimeout(() => {
      if (username === "admin" && password === "password") {
        localStorage.setItem("auth", "true");
        router.push(routes.dashboard);
      } else {
        setError("Credenciais inválidas. Tente novamente.");
        setIsLoading(false);
      }
    }, 800);
  };
  return(

  );
}