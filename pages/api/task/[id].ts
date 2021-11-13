import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getUser } from '../../../utils/getUser'

async function handlePatch(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string

  const user = await getUser(req)
  const { title, description, status } = req.body

  const task = await prisma.task.findUnique({
    where: {
      id,
    }
  })

  if (task.creatorId !== user.id) {
    res.status(403).end('Access denied')

    return;
  }

  const updatedTask = await prisma.task.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      status,
    },
  })

  res.json(updatedTask)
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string

  const user = await getUser(req)

  const task = await prisma.task.findUnique({
    where: {
      id,
    }
  })

  if (task.creatorId !== user.id) {
    res.status(403).end('Access denied')

    return;
  }

  const deletedTask = await prisma.task.delete({
    where: {
      id,
    },
  })

  res.json(deletedTask)
}

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    handlePatch(req, res)
  } else if (req.method = 'DELETE') {
    handleDelete(req, res)
  }
}