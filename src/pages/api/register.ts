import bcrypt from 'bcrypt';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { prisma } from '../../server/db';


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'POST') {
        res.status(405).json({message: 'Method not allowed'})
        return
    }

    try {
        const {email, name, password} = req.body;

        const existingUser = await prisma.user.findUnique({where: {email}});

        if (existingUser) {
            return res.status(422).json({message: 'Email already in use'})
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data:{
                email,
                name,
                hashedPassword,
                image : '',
                emailVerified: new Date()
            }
        });
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'}) 
    }
}