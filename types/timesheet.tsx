export type TimesheetStatus = "COMPLETED" | "INCOMPLETE" | "MISSING";

export interface TimesheetItem {
  id: string;
  weekNumber: number;
  dateRange: string;
  status: TimesheetStatus;
}

export interface TimesheetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Omit<TimesheetItem, "id"> & { id?: string }) => void;
  initialData: TimesheetItem | null;
}
