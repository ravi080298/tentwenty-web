import React from "react";
import { TimesheetStatus } from "@/types/timesheet";

interface StatusBadgeProps {
  status: TimesheetStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<TimesheetStatus, string> = {
    COMPLETED: "bg-emerald-50 text-emerald-700 border-emerald-200",
    INCOMPLETE: "bg-amber-50 text-amber-700 border-amber-200",
    MISSING: "bg-rose-50 text-rose-600 border-rose-200",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide border ${styles[status]}`}
    >
      {status}
    </span>
  );
}
