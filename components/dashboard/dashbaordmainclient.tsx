// components/dashboard/DashboardMainClient.tsx
"use client";

import React, { useState, useCallback } from "react";
import StatusBadge from "../statusbadge";
import TimesheetModal from "./timesheetmodal";
import { TimesheetItem } from "@/types/timesheet";
import { useTimesheets } from "../../context/themesheetcontext";

export default function DashboardMainClient() {
  // Use centralized state management instead of local state
  const { timesheets, addTimesheet, editTimesheet } = useTimesheets();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<TimesheetItem | null>(null);

  const handleOpenAddModal = useCallback(() => {
    setEditingItem(null);
    setIsModalOpen(true);
  }, []);

  const handleOpenEditModal = useCallback((item: TimesheetItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const handleSaveTimesheet = useCallback(
    async (modalData: Omit<TimesheetItem, "id"> & { id?: string }) => {
      if (modalData.id) {
        await editTimesheet(modalData as TimesheetItem);
      } else {
        await addTimesheet(modalData);
      }
    },
    [addTimesheet, editTimesheet],
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-4 overflow-hidden">
        {/* Header Grid Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 gap-2 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              Your Timesheets
            </h2>
            <p className="text-2xs text-slate-500 mt-0.5">
              Manage and audit metric logs entries workflow
            </p>
          </div>

          {/* Icon Button Container with Hover Group */}
          <div className="relative group self-start sm:self-auto">
            <button
              onClick={handleOpenAddModal}
              aria-label="Add Log Entry"
              className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors flex items-center justify-center shadow-sm"
            >
              {/* Heavy Plus Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </button>

            {/* Pure CSS Tooltip Box */}
            <div className="absolute right-0 top-full mt-2 hidden group-hover:flex items-center justify-center z-30 pointer-events-none animate-fade-in">
              {/* Tooltip Arrow */}
              <div className="absolute -top-1 right-3.5 w-2 h-2 bg-slate-900 rotate-45"></div>
              {/* Tooltip Label */}
              <span className="bg-slate-900 text-white text-2xs font-medium px-2 py-1 rounded shadow-md whitespace-nowrap">
                Add Log Entry
              </span>
            </div>
          </div>
        </div>

        {/* Filter Toolbar View */}
        <div className="flex items-center gap-2 py-2.5">
          <select className="cursor-pointer px-2.5 py-1 text-2xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md shadow-sm focus:outline-none">
            <option>Date Range</option>
          </select>
          <select className="cursor-pointer px-2.5 py-1 text-2xs font-medium text-slate-600 bg-white border border-slate-200 rounded-md shadow-sm focus:outline-none">
            <option>Status</option>
          </select>
        </div>

        {/* Dense Responsive Data Table */}
        <div className="overflow-x-auto border border-slate-100 rounded-lg">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-400 font-semibold text-2xs uppercase tracking-wider border-b border-slate-100">
                <th className="py-2.5 px-4 font-semibold text-slate-400 w-20">
                  Week #
                </th>
                <th className="py-2.5 px-4 font-semibold text-slate-400 w-70">
                  Date
                </th>
                <th className="py-2.5 px-4 font-semibold text-slate-400 w-32">
                  Status
                </th>
                <th className="py-2.5 px-4 text-right pr-6 font-semibold text-slate-400 w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
              {timesheets.map((item: TimesheetItem) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/50 transition-colors"
                >
                  <td className="py-2.5 px-4 font-medium bg-slate-50 w-20">
                    {item.weekNumber}
                  </td>
                  <td className="py-2.5 px-4 text-slate-500">
                    {item.dateRange}
                  </td>
                  <td className="py-2.5 px-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="py-2.5 px-4 text-right pr-6">
                    <button
                      onClick={() => handleOpenEditModal(item)}
                      className="cursor-pointer text-xs font-semibold text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      {item.status === "MISSING"
                        ? "Create"
                        : item.status === "INCOMPLETE"
                          ? "Update"
                          : "View"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Compact Semantic Footer Pagination */}
        <footer className="flex flex-col sm:flex-row items-center justify-between pt-4 gap-4 border-t border-slate-100 mt-4">
          <select className="cursor-pointer px-2 py-1 text-2xs bg-white border border-slate-200 rounded-md text-slate-600 focus:outline-none">
            <option>5 per page</option>
          </select>

          <div className="flex items-center gap-1">
            <button
              className="cursor-pointer px-2.5 py-1 text-2xs font-medium text-slate-400 hover:text-slate-600 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="cursor-pointer h-6 w-6 rounded-md text-2xs font-medium bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-center">
              1
            </button>
            <button className="cursor-pointer h-6 w-6 rounded-md text-2xs font-medium text-slate-400 hover:bg-slate-50 flex items-center justify-center">
              2
            </button>
            <button className="cursor-pointer h-6 w-6 rounded-md text-2xs font-medium text-slate-400 hover:bg-slate-50 flex items-center justify-center">
              3
            </button>
            <span className="text-slate-300 text-2xs px-0.5">...</span>
            <button className="cursor-pointer h-6 w-6 rounded-md text-2xs font-medium text-slate-400 hover:bg-slate-50 flex items-center justify-center">
              99
            </button>
            <button className="cursor-pointer px-2.5 py-1 text-2xs font-medium text-blue-600 hover:text-blue-800">
              Next
            </button>
          </div>
        </footer>
      </div>

      <TimesheetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveTimesheet}
        initialData={editingItem}
      />
    </main>
  );
}
