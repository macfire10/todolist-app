import { useEffect, useState } from 'react'
import { Task } from '.prisma/client'
import Head from 'next/head'

import { TaskCreateInput } from '../components/TaskCreateInput'
import { TaskInformationModal } from '../components/TaskInformationModal'
import { TaskList } from '../components/TaskList'
import prisma from '../lib/prisma'
import { getUser } from '../utils/getUser'
import { StyledGrid } from './styles'
import { useTasks } from './useTasks'

export default function Home({ preloadedTasks }) {
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

  console.log(tasks)

  return (
    <>
      <Head>
        <title>Todo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledGrid
        container
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <TaskCreateInput
          value={inputValue}
          onFieldChange={setInputValue}
          onButtonClick={createTask}
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
    </>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const user = await getUser(req)

  const preloadedTasks = await prisma.task.findMany({
    orderBy: [
      {
        createdAt: 'asc',
      },
    ],
    where: {
      creatorId: user.id,
    },
  })

  return {
    props: {
      preloadedTasks,
    }, // will be passed to the page component as props
  }
}
