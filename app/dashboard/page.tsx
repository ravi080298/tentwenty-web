// app/dashboard/page.tsx
import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import DashboardHeader from "../../components/dashboard/dashboardheader";
import DashboardMainClient from "../../components/dashboard/dashbaordmainclient";
import Footer from "@/components/footer";
import { TimesheetItem } from "@/types/timesheet";
import { TimesheetProvider } from "@/context/themesheetcontext";

// Server-side fetch execution worker
async function getTimesheets(): Promise<TimesheetItem[]> {
  // absolute fallback URL handling for Next.js internal local server routing environments
  const baseUrl = process.env.NEXTAUTH_URL
    ? process.env.NEXTAUTH_URL
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  try {
    const res = await fetch(`${baseUrl}/api/timesheets`, {
      method: "GET",
      cache: "no-store", // Disables server caching to make sure updates from POST/PUT are instantly pulled
    });

    if (!res.ok) {
      throw new Error("Failed to fetch timesheet matrix streams");
    }

    return await res.json();
  } catch (error) {
    console.error("Dashboard Server Fetch Error:", error);
    return []; // Graceful empty fallback array boundary error mapping
  }
}

export default async function DashboardPage() {
  // 1. Authenticate user on the server side
  const session = await getServerSession(authOptions);

  // 2. Reject unauthenticated access
  if (!session) {
    redirect("/login");
  }

  // Await the GET API execution stream securely on the server side
  const initialTimesheets = await getTimesheets();

  // 3. Render secure modular container viewports layout
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased">
      <DashboardHeader />
      <TimesheetProvider initialData={initialTimesheets}>
        <div className="flex-grow">
          <DashboardMainClient />
        </div>
      </TimesheetProvider>
      <Footer />
    </div>
  );
}
