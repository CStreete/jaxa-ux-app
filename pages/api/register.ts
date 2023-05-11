import { NextApiRequest, NextApiResponse } from "next"
import prismadb from "@/libs/prismadb"
import bcrypt from "bcrypt"

//Registring Api endpoint
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    //Begränsar endpoint till post
    if (req.method !== "POST") {
      return res.status(405).end()
    }

    //Förvantad data
    const { email, password, name, username } = req.body
    //Kollar om användaren finns
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      res.status(422).json({ error: "Email Taken" })
    }
    // Lösenord kryptering
    const hashedPassword = await bcrypt.hash(password, 12)
    // Skapar och sparar ny användare
    const user = await prismadb.user.create({
      data: {
        email,
        username,
        name,
        hashedPassword,
        profileImage: "",
      },
    })

    return res.status(200).json(user)
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
