import { NextApiRequest, NextApiResponse } from "next/types"
import { prisma } from "~/server/db"
import { sendEmail } from "./service/mailService"
import crypto from 'crypto'

function generateToken() {
  return crypto.randomBytes(20).toString('hex');
}

export async function handler (req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    const resetToken = generateToken();
    const resetTokenExpiresAt = new Date();
    resetTokenExpiresAt.setHours(resetTokenExpiresAt.getHours() + 1);


    await prisma.verificationToken.create({
      data: {
        identifier: user.id,
        token: resetToken,
        expires: resetTokenExpiresAt,
      },
    });

    await sendEmail({
      recipient_email: email,
      reset_token: resetToken,
    })

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Something went wrong' })
  }
}