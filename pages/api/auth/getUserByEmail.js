// pages/api/register

import { getUserByEmail } from './saveProfileFirestore';


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email } = req.body

            const userExist = await getUserByEmail(email)
            if (!userExist) {
                return res.status(401).send({ sucess: false, message: 'User not found' })
            }

    
            return res.status(200).send({ sucess: true, data: userExist, message: 'User Data' })


        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Method Not Allowed
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}


