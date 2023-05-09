import prismadb from "@/libs/prismadb"
import type { NextApiRequest, NextApiResponse } from "next"

interface Data {
  // Define your response data structure here if needed
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(404).end()
  }

  try {
    const category =
      typeof req.query.category === "string" ? req.query.category : undefined

    let allRecipes

    if (category) {
      // Filter recipes by category if provided
      allRecipes = await prismadb.recepie.findMany({
        where: {
          category: {
            equals: category,
          },
        },
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        include: {
          author: {
            select: {
              name: true,
              profileImage: true,
              id: true,
            },
          },
        },
      })
    } else {
      // Fetch all recipes if no category provided
      allRecipes = await prismadb.recepie.findMany({
        orderBy: [
          {
            createdAt: "desc",
          },
        ],
        include: {
          author: {
            select: {
              name: true,
              profileImage: true,
              id: true,
            },
          },
        },
      })
    }

    return res.status(200).json(allRecipes)
  } catch (error) {
    console.error(error)
    return res.status(400).end()
  }
}
