// pages/api/register
import { updatepassword } from './saveProfileFirestore';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body

            await updatepassword(email, password)
            return res.status(200).send({ success: true, message: 'Password Updated' });


        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Method Not Allowed
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}


