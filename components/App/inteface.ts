import { Task } from ".prisma/client";

export interface AppProps {
  preloadedTasks: Task[]
}