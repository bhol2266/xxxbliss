// pages/api/auth/callback.js

import { serialize } from 'cookie';

export default async function handler(req, res) {
  const { code } = req.query;

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = "http://localhost:3000/api/auth/callback"; // Make sure this matches your registered URI

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error('Failed to fetch access token');
    }

    const tokenData = await tokenResponse.json();

    // Fetch user info
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!userResponse.ok) {
      throw new Error('Failed to fetch user info');
    }

    const userData = await userResponse.json();

    await fetch(`http://localhost:3000/api/auth/saveProfileFirestore`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        displayName: userData.name,
        email: userData.email,
        photoURL: userData.picture,
      }),
    });


    
    // Set cookies
    res.setHeader('Set-Cookie', [
      serialize('email', userData.email, { maxAge: 900000, path: '/' }),
      serialize('membership', false, { maxAge: 900000, path: '/' }),
      serialize('Firstname', userData.name.trim().split(' ')[0], { maxAge: 900000, path: '/' }),
      serialize('countryUpdated_DB', 'false', { maxAge: 900000, path: '/' }),
      serialize('account', 'google', { maxAge: 900000, path: '/' }),
    ]);

    // Redirect to homepage
    res.redirect('/');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
