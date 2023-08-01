import { type NextApiRequest, type NextApiResponse } from 'next';
import { prisma } from '../../server/db';
import { sendEmail } from './service/mailService';


  

export default async function handler(req: NextApiRequest, res: NextApiResponse){
    if (req.method !== 'POST') {
        res.status(405).json({message: 'Method not allowed'})
        return
    }

        sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
}