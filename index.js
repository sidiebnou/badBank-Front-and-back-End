var express = require("express");
var cors = require("cors");
// var dal = require("./dal.js");
const path = require("path");
const checkAuth = require("./auth");
const {
  getAllAccountsByUser,
  updateAccount,
  createAccount,
  deleteAccount,
} = require("./db");
var app = express();

// used to serve static files from public directory
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/client/build")));

app.get("/api/getAllAccounts", checkAuth, async function (req, res) {
  // check if account exists
  const user = req.user;
  console.log(user);
  const allAccounts = await getAllAccountsByUser(user.email || user.sub);
  res.json(allAccounts);
});

app.post("/api/updateAccount", checkAuth, async function (req, res) {
  const body = req.body;
  await updateAccount(body.id, body.balance);
  res.status(200).json({ updated: true });
});

app.post("/api/createAccount", checkAuth, async function (req, res) {
  // check if account exists
  const user = req.user;
  const name = req.body.name;
  const allAccounts = await createAccount(user.email || user.sub, name);
  res.json(allAccounts);
});

app.delete("/api/deleteAccount/:id", checkAuth, async function (req, res) {
  // check if account exists
  const updatedAccount = await deleteAccount(req.params.id);

  res.json({ deleteAccount: true });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

var port = 3000;
app.listen(port);
console.log("Running on port: " + port);
