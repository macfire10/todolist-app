import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getUser } from '../../../utils/getUser'

// POST /api/task
async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  const token = await getUser(req, res)
  const { title, description = '' } = req.body

  if (!token) res.status(401).end('Unauthorized')

  const result = await prisma.task.create({
    data: {
      title,
      description,
      creator: { connect: { id: token } },
    },
  })

  res.json(result)
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const token = await getUser(req, res)

  if (!token) res.json([])

  const tasks = await prisma.task.findMany({
    orderBy: [
      {
        createdAt: 'asc',
      },
    ],
    where: {
      creatorId: token,
    }
  })

  res.json(tasks)
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  async function handleRequest() {
    if (req.method === 'GET') {
      await handleGet(req, res)
    } else if (req.method === 'POST') {
      await handlePost(req, res)
    }
  }

  try {
    await handleRequest()
  } catch (error) {
    throw new Error(error);
  }
}