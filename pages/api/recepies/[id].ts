import prismadb from "@/libs/prismadb"
import type { NextApiRequest, NextApiResponse } from "next"
import { type } from "os"

type ID = {
  recepieID: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(404).end
  }

  try {
    const recepieID = req.query.id

    const singleRecepie = await prismadb.recepie.findUnique({
      where: {
        id: String(recepieID),
      },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            profileImage: true,
          },
        },
      },
    })

    return res.status(200).json(singleRecepie)
  } catch (error) {
    return res.status(400).end()
  }
}
