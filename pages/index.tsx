import { App } from '../components/App'
import prisma from '../lib/prisma'
import { getUser } from '../utils/getUser'
import { GetServerSideProps } from 'next'
import { Task } from '.prisma/client'

export default function Home({ preloadedTasks }: { preloadedTasks: Task[] }) {
  return <App preloadedTasks={preloadedTasks} />
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context
  const user = await getUser(req, res)

  let preloadedTasks = []

  if (user) {
    preloadedTasks = await prisma.task.findMany({
      orderBy: [
        {
          createdAt: 'asc',
        },
      ],
      where: {
        creatorId: user,
      },
    })
  }

  return {
    props: {
      preloadedTasks,
    },
  }
}
