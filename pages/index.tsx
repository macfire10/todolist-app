import { useState } from 'react'
import { Task } from '.prisma/client'
import Head from 'next/head'

import { TaskCreateInput } from '../components/TaskCreateInput'
import { TaskInformationModal } from '../components/TaskInformationModal'
import { TaskList } from '../components/TaskList'
import prisma from '../lib/prisma'
import { getUser } from '../utils/getUser'
import { StyledGrid, StyledContainer } from './styles'
import { useTasks } from './useTasks'
import { GetServerSideProps } from 'next'

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { res } = context
  const user = await getUser(res)

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
