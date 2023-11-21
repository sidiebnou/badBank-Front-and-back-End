const admin = require("firebase-admin");
const serviceAccount = require("./firebaseSDK.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://bad-benk-default-rtdb.firebaseio.com",
});

function checkAuth(req, res, next) {
  const token = req.headers.authorization.split("Bearer ")[1];
  admin
    .auth()
    .verifyIdToken(token)
    .then((decodedToken) => {
      req.user = decodedToken;
      next();
    })
    .catch((error) => {
      res.status(401).send("Unauthorized");
    });
}

module.exports = checkAuth;
