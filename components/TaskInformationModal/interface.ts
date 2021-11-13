import { Task } from ".prisma/client";

export interface TaskInformationModalProps {
  open: boolean;
  onClose: () => void;
  task: Task
  updateTask: (id: string, taskBody: Partial<Task>) => void
  deleteTask: (id: string) => void
}