// pages/api/register

import { checkUserExists, saveUserProfile } from "./saveProfileFirestore";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { firstName, lastName, email, password, country } = req.body;

            try {
                const userExists = await checkUserExists(email);
                if (userExists) {
                    res.status(200).json({ message: 'User exists' });
                } else {
                    res.status(200).json({ message: 'User does not exist' });
                }
            } catch (error) {
                console.error('Error checking user existence:', error);
                res.status(500).json({ error: 'Internal Server Error' });
            }



            // await saveUserProfile(firstName, lastName, email, "", password, true, country, true, false, [])


        } catch (error) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        // Method Not Allowed
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
}
