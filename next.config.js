const path = require('path');

module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'links.papareact.com',
      'platform-lookaside.fbsbx',
      'firebasestorage.googleapis.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
      'www.pexels.com',
      'hotdesipics.co',
      'i.picsum.photos',
      'static-ca-cdn.eporner.com',
      'imggen.eporner.com',
      'www.pezporn.com',
      'pornpics.de',
      'cdni.pornpics.de',
      'static-sg-cdn.eporner.com'
    ],
  }, 
  env: {
    CLOUDFLARE_STORAGE: 'https://pub-46cdeefeaf774247ab99232ab1ebaa66.r2.dev/',
    BACKEND_URL: 'https://cloudflare-workers-project.ukdevelopers007.workers.dev/chutlunds/',
    FRONTEND_URL: 'https://www.cumcraze.com/',
    // FRONTEND_URL: 'http://localhost:3000/',
    REDIRECT_URI: "http://localhost:3000/api/auth/callback",
    FACEBOOK_APP_SECRET: '691004714be90ba61d9ab8e0ba0d0c5e',
    FACEBOOK_APP_ID: '412940630805200',
    GOOGLE_CLIENT_ID: '1004706057785-k3qei8am5at1g5789vqudsgr13455a0o.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
    MONGODB_URI_STRING: 'mongodb+srv://bhola:IyNs48Pf1SNHUWpu@cluster0.acjho.mongodb.net/chutlunds?retryWrites=true&w=majority',
    PAYPAL_CLIENT_ID: 'AQEfZ9BtOjDaH-FAfZX-yRRFO7RmeSyNycJmJ8IiykzjBWGEKF_5yQJs-xagJEAT0D_fI-7GVdlYrrtX',
    PAYPAL_CLIENT_SECRET: 'EHdwoyfs3cRT6bFCDBgnwIQR67PW8C4AK5spurQoW7A92YBNUPodWG_vtz5XRfBhMouwisgZPVn5ltaV',
    PAYPAL_ENDPOINT: 'https://api-m.sandbox.paypal.com',
    JWT_SECRET: 'dsaljfhsaldkfsldaflksdf;afd',
    NEXTAUTH_SECRET: 'dsaljfhsaldkfsldaflksdf;afd',
    FIREBASE_SERVICE_ACCOUNT: JSON.stringify({
      type: "service_account",
      project_id: "chutlunds-bb715",
      private_key_id: "8306ad8f2eb0d55e7e85ca39387dc426044dfdc4",
      private_key: "-----BEGIN PRIVATE KEY-----MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCnqNFUaeIUTvgxVMTJoGXSSrqq1Jt34WjorEHwbaDRtH0z7fIjDBdgrEw11UN2CROLzNgyNTWh7Fn7VgqO3kCz0dEG7HP/a3HhH7Z/L/MbaynudXEpwdhIsdwKVXjLrkeMCA9XWPwpOl24m55gfvchdwcsNDfIrSKmg+1kmmEFQEq9uYLhRlnVlTMk1O8ZGDX8ulrBedTANRNeZJoBNlzJqZolNOvfXGNkOTgxwr8zPwY7/2ziykcubh+VqJp4Wla4USwwpi6UvZW+Ab0S7jivQoHvjWXlYdwiPkfHBduFvtnufxgb6abw7p8iQNDuEXIsrG1ZKGhNqoeFyH281q87AgMBAAECggEALK+ip3CXONl5blCNKL5PFTckvJ5xF4klOIqdApN9nxcPndUoSe4RlwslPt3qHp45rvO4ld03v8Iqk4IxyzVyolrkbwd7vVKqZhnZPtoNXjv4T53OvRX06x84qipwyTzYxfpp+Fp3zxdG3orfshF1Fd7PMxlx2tNGnoIgNkWtYUP8VWMVPq3HhSc0MP4nBBsBNpq3QmgpYzJjwU3gg/2v63RQ3fBmzuwsA/vwO11ZVU5XbKT5ftI7VRnHUBiyq7HbddDCqES4f3iw0W/EWBevQOC+R0FzKK56+HaX5K/NuwzCF99OhWczA3ra35C+8tvF/RqMwVThl8fMK0AZtgeOaQKBgQDd4TIeD9+UjJsDIiWxzWeHpTNXljAs7pcDg04z8v5mgiWc8rb0jWZbSjFiLaH2IQmWMxQkEjuOeSqm1lUAX76DIDINVvwa/CBfSnMpdZW79iT4Pciy+Jr9gsuCrHKjmoIz6i/Zg8bOcTs4C5HiS8lbC5Yzn/oSbk6svpnZJGT7mQKBgQDBcR4pz1eKVUjtlIqOTUAtsvkldjszW9FFHLMUOhSVkjDR79sG190tJFO0svaPKBC21HAsew9D46Pi0+r0p+P/J/FjNFWNfiwcF1HJoW8nljKw8zA+jlcYUtHQmOAy/UdB17TESARbBUpNBGJCnCyZK/9bcNSoY7ljeq6vDszl8wKBgHIZqpI3C3zyyYxU9Rl4TbM9yydRfri8gUA3N/ITFaxVZU5OqrMcO/TaNIcOfGl8F9f7sHHURng/6yUct12X3vrDhbnCb6bY3TTjrlE1vKiKLfzSmPEgU2Pm7Qzn7ZQgkrBrz+uFjqj/JbruiDjdTFDbpoQp0onD3AWNhsRZqOyRAoGBAI64h9mvKdZdYCYxvxyIsH5HGv1hwwH8j2UfbJzS0Vcdejmabw4YfA4PTFb452Lt248ZI/4deUDMlqEHW8XQjS43aSiZdzmiyqabKfPK0LjzX0kg1AqDeIzwpe7yrA/SwR06KhvbSqNhPtWeE2Uz1s/YH1p239+xXBmibXmpQNGzAoGBAIciP9OYkmM324v0CsNrTR8ntIUB/kJ8QrubpfmJD/TJXTLi7F3OWTHVSOQaVt0obLTxCRU8Sx3hHgWTPEQzffZznpJMz9kkequicHqM8/eCZ6/cGYRVQqGSzpxDVonB4//ys6emIMetoFAPFfrOv9l9fUNM063uhzjSYi1P1UCR",
      client_email: "firebase-adminsdk-3p0qt@chutlunds-bb715.iam.gserviceaccount.com",
      client_id: "106158116483532715704",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3p0qt%40chutlunds-bb715.iam.gserviceaccount.com",
      universe_domain: "googleapis.com"
    })
  },
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};
