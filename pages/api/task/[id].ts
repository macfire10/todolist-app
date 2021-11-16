import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'
import { getUser } from '../../../utils/getUser'

async function handlePatch(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id as string

  const user = await getUser(req, res)
  const { title, description, status } = req.body

  if (!user) {
    res.status(401).end('Unauthorized')

    return;
  }

  const task = await prisma.task.findUnique({
    where: {
      id,
    }
  })

  if (task.creatorId !== user) {
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

  const user = await getUser(req, res)

  if (!user) {
    res.status(401).end('Unauthorized')

    return;
  }


  const task = await prisma.task.findUnique({
    where: {
      id,
    }
  })

  if (task.creatorId !== user) {
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
  async function handleRequest() {
    if (req.method === 'PATCH') {
      await handlePatch(req, res)
    } else if (req.method === 'DELETE') {
      await handleDelete(req, res)
    }
  }

  try {
    await handleRequest()
  } catch (error) {
    throw new Error(error);
  }
}