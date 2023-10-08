const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");

const booksRoutes = require("./Routes/books");
const commentsRoutes = require("./Routes/comments");
const usersRoutes = require("./Routes/users");
// import usersRoutes from './Routes/users.js'
// import booksRoutes from './Routes/books.js'
// import commentsRoutes from './Routes/comments.js'

const app = express();
const PORT = 5000;

// Configura el middleware para analizar JSON
app.use(express.json());

let users = [];

const doesExist = (username) => {
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
};

app.use(session({ secret: "fingerpint" }));

app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  console.log("req" + JSON.stringify(req.body));
  console.log("username", username + "password" + password);

  for (let propiedad in req.body) {
    console.log(propiedad + ": " + req.body[propiedad]);
  }

  if (username && password) {
    if (!doesExist(username)) {
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registred. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  return res.status(404).json({
    message:
      "Unable to register user." + "User " + username + "password " + password,
  });
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({ message: "Error logging in" });
  }

  if (authenticatedUser(username, password)) {
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );

    req.session.authorization = {
      accessToken,
      username,
    };
    res.status(200).send("User successfully logged in");
  } else {
    res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

app.use("/users", usersRoutes);
app.use("/books", booksRoutes);
app.use("/comments", commentsRoutes);

app.listen(PORT, () => console.log("Server is running at port " + PORT));
