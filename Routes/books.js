const express = require("express");
const booksRoutes = express.Router();

let books = [
  {
    name: "John Lennon",
    author: "Luis Dominguez",
    available: true,
    ISBN: "0-13-165456-7",
  },
  {
    name: "John Mccartney",
    author: "Daniel Mendoza",
    available: true,
    ISBN: "0-13-340982-7",
  },
  {
    name: "John Flores",
    author: "Kult",
    available: true,
    ISBN: "0-13-340982-7",
  },
];

booksRoutes.get("/", (req, res) => {
  res.send(JSON.stringify({ books }, null, 2));
});

booksRoutes.get("/search/ISBN/:ISBN", (req, res) => {
  const ISBN = req.params.ISBN;
  console.log("ISBN", ISBN);
  const result = books.filter((book) => book.ISBN === ISBN);
  result.length > 0
    ? res.send(JSON.stringify({ result }, null, 2))
    : res.send(JSON.stringify('No se encontraron resultados'), null, 2) 
});

booksRoutes.get("/search/author/:author", (req, res) => {
    const author = req.params.author;
    console.log("author", author);
    const result = books.filter((book) => book.author === author);
    result.length > 0
      ? res.send(JSON.stringify({ result }, null, 2))
      :  res.status(404).json({ message: 'No se encontraron libros de ese autor.' }); 
  });



module.exports = booksRoutes;
