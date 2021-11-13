import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getUser } from '../../../utils/getUser'

// POST /api/task
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUser(req)
  const { title, description = '' } = req.body

  const result = await prisma.task.create({
    data: {
      title,
      description,
      creator: { connect: { id: user.id } },
    },
  })

  res.json(result)
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const user = await getUser(req)

  const tasks = await prisma.task.findMany({
    orderBy: [
      {
        createdAt: 'asc',
      },
    ],
    where: {
      creatorId: user.id,
    }
  })

  res.json(tasks)
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    handleGet(req, res)
  } else if (req.method === 'POST') {
    handlePost(req, res)
  }
}