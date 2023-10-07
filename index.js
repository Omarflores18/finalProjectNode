const express = require('express');

const booksRoutes = require('./Routes/books');
const commentsRoutes = require('./Routes/comments');
const usersRoutes = require('./Routes/users');
// import usersRoutes from './Routes/users.js'
// import booksRoutes from './Routes/books.js'
// import commentsRoutes from './Routes/comments.js'

const app = express();
const PORT =5000;

app.use(express.json());

app.use("/users", usersRoutes);
app.use("/books", booksRoutes);
app.use("/comments", commentsRoutes);

app.listen(PORT,()=>console.log("Server is running at port "+PORT));