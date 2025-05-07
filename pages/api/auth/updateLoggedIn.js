// pages/api/register

import { updateLoggedIn } from './saveProfileFirestore';


export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email } = req.body;

            await updateLoggedIn(email, true)
            return res.status(200).send({ success: true, message: 'Login Status Updated!' });


        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Method Not Allowed
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}


