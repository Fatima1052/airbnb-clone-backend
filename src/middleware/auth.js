const admin = require("firebase-admin");

// Verifies the Firebase ID token the frontend already gets from
// firebase/auth (see src/AuthContext.jsx) and attaches { uid, email } to
// req.user. The frontend must send it as: Authorization: Bearer <idToken>
// (currentUser.getIdToken() in firebase/auth gives you that token).
//
// Needs FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY in
// .env — see .env.example for where to get them. Until those are set this
// middleware fails closed (401) rather than skipping the check.
let initialized = false;

function ensureFirebaseInitialized() {
  if (initialized) return;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      "Firebase Admin is not configured. Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL " +
        "and FIREBASE_PRIVATE_KEY in .env (see .env.example)."
    );
  }

  admin.initializeApp({
    credential: admin.credential.cert({ projectId, clientEmail, privateKey }),
  });

  initialized = true;
}

async function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res.status(401).json({ message: "Missing Authorization: Bearer <token> header" });
    }

    // A missing/broken server config is our problem, not the user's token.
    try {
      ensureFirebaseInitialized();
    } catch (configError) {
      console.error("Firebase Admin config error:", configError.message);
      return res.status(500).json({ message: "Server auth is not configured (Firebase env vars missing on the backend)" });
    }

    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { uid: decoded.uid, email: decoded.email };

    next();
  } catch (error) {
    console.error("Auth error:", error.code, error.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = { requireAuth };
