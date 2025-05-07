// pages/api/auth/saveProfileFirestore.js
import admin from 'firebase-admin';

// Initialize Firebase Admin SDK directly with the service account key
const serviceAccount = {
  "type": "service_account",
  "project_id": "chutlunds-bb715",
  "private_key_id": "a8afbf1897d56a2d54106db9258521234103ad43",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDV4QVqRLZ4xbRm\n6Z8OOB0wrILJ7tjekQTsz2M3wE9XO+JNAUBkzctwFfWoqmtERHUpNpxa1TUKPNel\nV3jsw1wz6IyWTsT3174FGmOXyIr7E6TNK22H63cuZ76YuGpgxcop6dnDDscq4f2I\nh1yqP7+naMO0SprYcnDDi+y9OC55PnqL3NLwU4jjgNgGRTza97wKWylXyxMxci9r\nKomMa51nr+dd+XmORQSgdAr/8Xj4ZZ64KRcQWRbp8cUY6urCWty3VR4u9DrsoHQM\nk5XO9PIdiGYRJ/JB+jNQNnAmHZ+jCa4V68k1bctfRROCGDHvRMGd8CxDbp0sZhOE\nNpcqcL/bAgMBAAECggEAKINNQUnuvoXEnFHYfRsH/HZQ9+s0TURvCGRoSOE2pjGD\ntk5sYivRQ1QFioNteir1fm8HwvTr7RqFRp6BG2gOCQ8dwkL9cGz/Y3wSLWghW1nn\nN63oO3zQwIuKQOd9zwLoPnQ7eYVNGMRiAACT/vPAW/euSnJvTlyvG3tfxp/jvbdN\nXUlS/2V/Q06ISDo/58nQdGtlNJVod9YBUrvHzUedZkXfPInb/ZTZ8QvHO11SsSmT\n88++esqX2IgNzwiZzMoqQCFgViUEF1RpNiwdy/296qHFoXOVq9woALDlaVkiEQkA\n6iFsaDAXWgZB/V7HNi8kT31ylMmmUpeqwXhA7ooYsQKBgQDrCa7/fLmSMyB8qm3L\nvxx8x9kwvTzpR9nJ8c7ZqILscVqfEmCtdtze9XaEbmW3B0B36m3IaafVRzB/080I\nGjbFx1EP1mT502lvCFi+HZb9OMqeZpaEJUnZXOfb/e+FMUILFYd2l4L/67kprnQ9\nS9kzPRSIZyLTJa35UAY2IV7kPQKBgQDo9D665Yw3Qpb42l3PrhJC4mmvr2l58OK8\nJzgVKb8lENOfRRlX1jlthESqWDSmTHQHJBoz/yNdXp9R6M4FML2zfiZHWszTjEZP\nU2P2lQrFFZSSb8VKp2UqtXbKDrixw6r5LXbfD1PFA9NDyXqI7lpOWuHy64Ke1stL\nTT6PAYA99wKBgQCJnW3dIUX2GAFZfOA0f31KgijkpKhZXjxiRTZ7snKVxfjtUnFQ\nn1vLH6V4/LqJY7GXhKcqxNIDyl7XOUe/CrovKviHcVxF+katQBHVnrWdJfdcr2xJ\nixumLQOEhzYKokCtBLn/8c490eLkSMS+bv6JRaYUB28YeeNXKke4wekxcQKBgQDn\n0uB2V6eg+oiJX64J1d3gZ7brGfIqYrkQqyrZjLDmrwcaMcaVrd96iC1ZI+xJLj4t\nORVGd3n3GgoMllQnwCiYbkqjqc26HJd/q6oIIqwUE3TGAarhrxIzXWC4lcvhQ6pq\nzH7GXldr8XGVvPRPPnvqC/FdMFfNwE2RQ26lG8ZGYwKBgQCRBoN7JJGDDdBKqMI4\nEbCs+1+E3Y4mfqYtlCRF7210IvnQ7hSOeMwvjvjnsSL3pqHzhiL4vImdTr/OSMGX\n2ve/x9RB3a97vcA1qvSXNGkzZD4WbUtXzS3XsAM6gj3ikLw2hQeNVX72W8slOpIc\n+W2718bxJllme3G3f3Nat/Ucbg==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-3p0qt@chutlunds-bb715.iam.gserviceaccount.com",
  "client_id": "106158116483532715704",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-3p0qt%40chutlunds-bb715.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        // Optionally, specify the database URL if needed
        // databaseURL: "https://your-project-id.firebaseio.com",
    });
}

const db = admin.firestore();

export async function saveUserProfile(firstName, lastName, email, profilePic, hashpass, verified, country, loggedIn, membership, keywords) {
    const data = {
        firstName,
        lastName,
        email,
        profilePic,
        hashpass,
        verified,
        country,
        loggedIn,
        membership,
        keywords,
        timestamp: admin.firestore.Timestamp.now() // Use Firestore's Timestamp
    };

    const documentId = email; // Ensure email is unique and valid for Firestore document ID

    try {
        const docRef = db.collection("Users").doc(documentId);
        await docRef.set(data);
        console.log("Document successfully written!");
    } catch (error) {
        console.error("Error writing document: ", error);
        throw error; // Propagate error to be handled by caller
    }
}

export async function getUserByEmail(email) {
    try {
        const docRef = db.collection("Users").doc(email);
        const doc = await docRef.get();

        if (doc.exists) {
            return doc.data(); // Return the user data if the document exists
        } else {
            return null; // Return null if the document does not exist
        }
    } catch (error) {
        console.error("Error retrieving user data: ", error);
        throw error; // Propagate error to be handled by caller
    }
}

export async function checkUserExists(email) {
    try {
        const docRef = db.collection("Users").doc(email);
        const doc = await docRef.get();
        return doc.exists; // Returns true if the document exists, false otherwise
    } catch (error) {
        console.error("Error checking user existence: ", error);
        throw error; // Propagate error to be handled by caller
    }
}

export async function updateLoggedIn(email, loggedInStatus) {
    try {
        const docRef = db.collection("Users").doc(email);
        await docRef.update({ loggedIn: loggedInStatus });
        console.log("Document successfully updated!");
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error; // Propagate error to be handled by caller
    }
}

export async function updateVerify(email, verifiedStatus) {
    try {
        const docRef = db.collection("Users").doc(email);
        await docRef.update({ verified: verifiedStatus });
        console.log("Document successfully updated!");
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error; // Propagate error to be handled by caller
    }
}

export async function updatepassword(email, password) {
    try {
        const docRef = db.collection("Users").doc(email);
        await docRef.update({ hashpass: password });
        console.log("Document successfully updated!");
    } catch (error) {
        console.error("Error updating document: ", error);
        throw error; // Propagate error to be handled by caller
    }
}

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { displayName, email, photoURL } = req.body;

            await saveUserProfile(displayName, "", email, photoURL, "", true, "", true, false, []);

            res.status(200).json({ message: 'Profile saved successfully' });
        } catch (error) {
            console.error('Error saving profile:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
