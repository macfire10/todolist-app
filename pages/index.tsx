import { App } from '../components/App'
import prisma from '../lib/prisma'
import { getUser } from '../utils/getUser'
import { GetServerSideProps } from 'next'
import { Task } from '.prisma/client'

export default function Home({ preloadedTasks }: { preloadedTasks: Task[] }) {
  return <App preloadedTasks={preloadedTasks} />
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
