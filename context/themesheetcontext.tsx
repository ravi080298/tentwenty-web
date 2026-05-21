"use client";

import React, { createContext, useContext, useState } from "react";
import { TimesheetItem } from "@/types/timesheet";

interface TimesheetContextType {
  timesheets: TimesheetItem[];
  addTimesheet: (item: Omit<TimesheetItem, "id">) => Promise<void>;
  editTimesheet: (item: TimesheetItem) => Promise<void>;
}

const TimesheetContext = createContext<TimesheetContextType | undefined>(
  undefined,
);

export function TimesheetProvider({
  children,
  initialData,
}: {
  children: React.ReactNode;
  initialData: TimesheetItem[];
}) {
  const [timesheets, setTimesheets] = useState<TimesheetItem[]>(initialData);

  // POST Request Handler
  const addTimesheet = async (newItem: Omit<TimesheetItem, "id">) => {
    try {
      const res = await fetch("/api/timesheets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
      if (!res.ok) throw new Error("Failed to save entry");
      const savedItem: TimesheetItem = await res.json();

      setTimesheets((prev) =>
        [...prev, savedItem].sort((a, b) => a.weekNumber - b.weekNumber),
      );
    } catch (err) {
      console.error("Error creating timesheet:", err);
    }
  };

  // PUT (Edit) Request Handler
  const editTimesheet = async (updatedItem: TimesheetItem) => {
    try {
      const res = await fetch("/api/timesheets", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });
      if (!res.ok) throw new Error("Failed to update entry");

      setTimesheets((prev) =>
        prev.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
      );
    } catch (err) {
      console.error("Error updating timesheet:", err);
    }
  };

  return (
    <TimesheetContext.Provider
      value={{ timesheets, addTimesheet, editTimesheet }}
    >
      {children}
    </TimesheetContext.Provider>
  );
}

export function useTimesheets() {
  const context = useContext(TimesheetContext);
  if (!context)
    throw new Error("useTimesheets must be used within a TimesheetProvider");
  return context;
}
