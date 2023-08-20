import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from "~/server/db";
import { getServerSession } from 'next-auth';
import { authOptions } from '~/pages/api/auth/[...nextauth]';

const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerSession(req, res, authOptions);

    if (!session?.user?.email) {
        throw new Error('NOT_AUTHORIZED');
    }

    const currentUser = await prisma.user.findUnique({
        where: {
            email: session.user.email
        },
        include: {
            wishListItems: true,
        }
    })

    return { currentUser };
}

export default serverAuth;