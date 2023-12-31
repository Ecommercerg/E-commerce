import bcrypt from 'bcrypt';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { prisma } from '../../server/db';
import { isPasswordValid } from '../../utils/passwordValidator';


export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'POST') {
        res.status(405).json({message: 'Method not allowed'})
        return
    }

    try {
        const {email, name, password} = req.body;

        const existingUser = await prisma.user.findUnique({where: {email}});

        //checks if user already exists
        if (existingUser) {
            return res.status(422).json({message: 'Email already in use'})
        }

        //checks if password is valid (respects the regex)
        if(isPasswordValid(password) === false){
            return res.status(422).json({error: 'NOT_VALID'})
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data:{
                email,
                name,
                hashedPassword,
                image : '',
                emailVerified: new Date(),
                cart: {
                    create: {
                        products: {
                            create: []
                        },
                        totalPrice: 0
                    }
                },
            }
        });
        return res.status(200).json(user)
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Internal server error'}) 
    }
}