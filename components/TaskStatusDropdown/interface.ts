import React from "react"
import { TaskStatus } from ".prisma/client";

export interface TaskStatusDropdownProps {
  currentStatus: TaskStatus
  onTaskStatusChange: (status: TaskStatus) => void
}

export interface SelectItemProps {
  value: TaskStatus
  status: TaskStatus
  children: React.ReactNode
}