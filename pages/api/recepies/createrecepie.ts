import { NextApiRequest, NextApiResponse } from "next"
import prismadb from "../../../libs/prismadb"

interface Recepie {
  authorId: string
  title: string
  servings: string
  time: string
  image: string
  ingredients: string[]
  intructions: string[]
  kuriosa: string
  category: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  try {
    const {
      title,
      servings,
      time,
      ingredients,
      intructions,
      authorId,
      image,
      kuriosa,
      category,
    }: Recepie = req.body

    const newRecepie = await prismadb.recepie.create({
      data: {
        authorId,
        title,
        servings,
        time,
        ingredients,
        intructions,
        image,
        kuriosa,
        category,
      },
    })

    return res.status(200).json(newRecepie)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
