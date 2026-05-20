// components/dashboard/TimesheetModal.tsx
"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Input from "../input";
import {
  TimesheetStatus,
  TimesheetItem,
  TimesheetModalProps,
} from "@/types/timesheet";

export default function TimesheetModal({
  isOpen,
  onClose,
  onSave,
  initialData,
}: TimesheetModalProps) {
  const [weekNumber, setWeekNumber] = useState("");
  const [dateRange, setDateRange] = useState("");
  const [status, setStatus] = useState<TimesheetStatus>("COMPLETED");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData) {
      setWeekNumber(initialData.weekNumber.toString());
      setDateRange(initialData.dateRange);
      setStatus(initialData.status);
    } else {
      setWeekNumber("");
      setDateRange("");
      setStatus("COMPLETED");
    }
    setErrors({});
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!weekNumber || isNaN(Number(weekNumber)) || Number(weekNumber) <= 0) {
      newErrors.weekNumber = "Please enter a valid positive week number.";
    }
    if (!dateRange.trim() || !dateRange.includes("-")) {
      newErrors.dateRange =
        "Enter date ranges exactly format (e.g., 12 - 16 Jan, 2024).";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    onSave({
      id: initialData?.id,
      weekNumber: Number(weekNumber),
      dateRange,
      status,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl border border-slate-200 w-full max-w-md overflow-hidden animate-fade-in">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">
            {initialData ? "Update Timesheet Entry" : "Create Timesheet Entry"}
          </h3>
          <button
            onClick={onClose}
            className="cursor-pointer text-slate-400 hover:text-slate-600 text-xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <Input
              label="Week Number"
              id="weekNumber"
              type="number"
              placeholder="e.g. 6"
              value={weekNumber}
              onChange={(e) => setWeekNumber(e.target.value)}
            />
            {errors.weekNumber && (
              <p className="text-xs text-rose-600 mt-1 font-medium">
                {errors.weekNumber}
              </p>
            )}
          </div>

          <div>
            <Input
              label="Date Range String"
              id="dateRange"
              type="text"
              placeholder="e.g. 5 - 9 February, 2024"
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
            />
            {errors.dateRange && (
              <p className="text-xs text-rose-600 mt-1 font-medium">
                {errors.dateRange}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-slate-700 mb-2"
            >
              Status State
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value as TimesheetStatus)}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
            >
              <option value="COMPLETED">COMPLETED</option>
              <option value="INCOMPLETE">INCOMPLETE</option>
              <option value="MISSING">MISSING</option>
            </select>
          </div>

          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="cursor-pointer px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Save Details
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
