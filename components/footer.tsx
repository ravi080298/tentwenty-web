// components/dashboard/DashboardFooter.tsx
"use client";

import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-100 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <p className="text-2xs text-slate-400 font-normal tracking-wide">
          &copy; {currentYear} ticktock. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
