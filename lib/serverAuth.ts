import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "~/server/db";
import { getServerSession } from 'next-auth';
import { authOptions } from '~/server/auth';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
        throw new Error('Not authenticated');
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        }
    })

    if (!currentUser) {
        throw new Error('User not found');
    }

    return { currentUser };
}

export default serverAuth;