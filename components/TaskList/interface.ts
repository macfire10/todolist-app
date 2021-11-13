import { Task } from ".prisma/client";

export interface TaskListProps {
  onTaskSelect: (task: Task) => void
  onTaskStatusUpdate: (id: string, taskStatus: string) => void
  tasks: Task[]
}