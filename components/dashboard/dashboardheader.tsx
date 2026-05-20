// components/dashboard/DashboardHeader.tsx
"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";

export default function DashboardHeader() {
  const { data: session } = useSession();

  return (
    <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <span className="text-xl font-bold tracking-tight text-slate-900">
            ticktock
          </span>
          <nav className="cursor-pointer hidden sm:flex space-x-4">
            <span className="text-sm font-medium text-blue-600 border-b-2 border-blue-600 px-1 py-5 translate-y-[2px]">
              Timesheets
            </span>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-900">
              {session?.user?.name || "John Doe"}
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="cursor-pointer text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-3 py-1.5 rounded-lg transition-colors"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>
  );
}
