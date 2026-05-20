// app/login/page.tsx
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import LoginFormClient from "../../components/login/loginFormClient";

export default async function LoginPage() {
  // 1. Run a lightweight backend token check via incoming cookie headers
  const session = await getServerSession(authOptions);

  // 2. Intercept authenticated users immediately
  if (session) {
    redirect("/dashboard");
  }

  // 3. Deliver clean form module to the web visitor
  return <LoginFormClient />;
}
