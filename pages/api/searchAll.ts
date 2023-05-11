import prismadb from "@/libs/prismadb"
import { Prisma } from "@prisma/client"
import type { NextApiRequest, NextApiResponse } from "next"

/*
import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, RecepieWhereInput } from "@prisma/client"

const prisma = new PrismaClient()

type RecipeWhereInputWithOr = RecepieWhereInput & {
  OR?: RecipeWhereInputWithOr[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { q: query } = req.query
      if (typeof query !== "string") {
        throw new Error("Invalid request")
      }

      const where: RecipeWhereInputWithOr = {
        OR: [
          {
            title: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            author: {
              username: {
                contains: query,
                mode: "insensitive",
              },
            },
          },
          { ingredients: { hasSome: [query] } },
          {
            kuriosa: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      }

      const allRecipes = await prisma.recepie.findMany({
        where,
        include: {
          author: {
            select: {
              username: true,
              profileImage: true,
              id: true,
            },
          },
        },
      })

      res.status(200).json({ allRecipes })
    } catch (error) {
      console.error(error)
      res.status(500).end()
    }
  }
}*/

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { q: query } = req.query
      if (typeof query !== "string") {
        throw new Error("Invalid request")
      }

      const allRecepies = await prismadb.recepie.findMany({
        where: {
          OR: [
            {
              title: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              author: {
                username: {
                  contains: query,
                  mode: "insensitive",
                },
              },
            },
            {
              ingredients: { hasSome: [query] },
              // ingredients: {
              //  contains: [query],
              //  mode: "insensitive",
            },

            {
              kuriosa: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
        include: {
          author: {
            select: {
              username: true,
              profileImage: true,
              id: true,
            },
          },
        },
      })

      res.status(200).json({ allRecepies })
    } catch (error) {
      res.status(500).end()
    }
  }
}
