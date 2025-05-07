// pages/api/register

import { sendOTPforVerification } from './register';
import { checkUserExists, getUserByEmail, updateLoggedIn } from './saveProfileFirestore';


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body

            const userExist = await getUserByEmail(email)
            if (!userExist) {
                return res.status(401).send({ sucess: false, message: 'User not found' })
            }

            if (password != userExist.hashpass) {
                return res.status(401).send({ sucess: false, message: 'Password Incorrect' })
            }



            if (!userExist.verified) {
                sendOTPforVerification(res, email)
            } else {
                return res.status(200).send({ sucess: true, data:  userExist , message: 'Logged In' })

            }



        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Method Not Allowed
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}


