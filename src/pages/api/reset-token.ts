import { NextApiRequest, NextApiResponse } from "next/types"
import { prisma } from "~/server/db"
import { sendEmail } from "./service/mailService"
import crypto from 'crypto'

function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}

//this api endpoint generates a token and sends it to the user's email
export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body

  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' })
    return
  }

  try {
    //checks if user exists
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    //generates token and saves it to the database
    const resetToken = generateToken();
    console.log(resetToken)
    const resetTokenExpiresAt = new Date();
    resetTokenExpiresAt.setHours(resetTokenExpiresAt.getHours() + 1);


    await prisma.verificationToken.create({
      data: {
        identifier: user.id,
        token: resetToken,
        expires: resetTokenExpiresAt,
      },
    });


    //sends email to user
    await sendEmail({
      recipient_email: email,
      reset_token: resetToken,
    })

    return res.status(200).json({ message: "success" })
  } catch (error) {
    return res.status(500).json({ error: 'Something went wrong' })
  }
}