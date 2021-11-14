import { useState } from 'react'
import { Task } from '.prisma/client'
import Head from 'next/head'

import { TaskCreateInput } from '../TaskCreateInput'
import { TaskInformationModal } from '../TaskInformationModal'
import { TaskList } from '../TaskList'

import { StyledGrid, StyledContainer } from './styles'
import { useTasks } from './useTasks'
import { AppProps } from './inteface'

// Main application route
export function App({ preloadedTasks }: AppProps) {
  const {
    tasks,
    inputValue,
    setInputValue,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    isCreatingTask,
  } = useTasks(preloadedTasks)

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const handleTaskSelect = (task: Task) => setSelectedTask(task)
  const handleModalClose = () => handleTaskSelect(null)

  return (
    <>
      <Head>
        <title>Todo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledContainer
        container
        flexDirection="column"
        alignItems="center"
      >
        <StyledGrid flexDirection="column">
          <TaskCreateInput
            value={inputValue}
            onFieldChange={setInputValue}
            onFormSubmit={createTask}
            loading={isCreatingTask}
          />
          <TaskList
            tasks={tasks}
            onTaskSelect={handleTaskSelect}
            onTaskStatusUpdate={updateTaskStatus}
          />
          <TaskInformationModal
            open={!!selectedTask}
            task={selectedTask}
            onClose={handleModalClose}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        </StyledGrid>
      </StyledContainer>
    </>
  )
}