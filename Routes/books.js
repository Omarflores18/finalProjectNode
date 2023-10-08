const express = require("express");
const booksRoutes = express.Router();

let books = [
  {
    title: "John Lennon",
    author: "Luis Dominguez",
    available: true,
    ISBN: "0-13-165456-7",
  },
  {
    title: "John Mccartney",
    author: "Luis Dominguez",
    available: true,
    ISBN: "0-13-340982-7",
  },
  {
    title: "John Flores",
    author: "Kult",
    available: true,
    ISBN: "0-13-340982-7",
  },
];

booksRoutes.get("/", async (req, res) => {
  try {
    res.send(JSON.stringify({ books }, null, 2));
  } catch {
    res.status((500).json({ error: "Hubo un error en la solicitud" }));
  }
});

// booksRoutes.get("/", (req, res) => {
//   res.send(JSON.stringify({ books }, null, 2));
// });



// booksRoutes.get("/search/ISBN/:ISBN", (req, res) => {
//   const ISBN = req.params.ISBN;
//   console.log("ISBN", ISBN);
//   const result = books.filter((book) => book.ISBN === ISBN);
//   result.length > 0
//     ? res.send(JSON.stringify({ result }, null, 2))
//     : res.send(JSON.stringify("No se encontraron resultados"), null, 2);
// });

booksRoutes.get("/search/ISBN/:ISBN", (req, res) => {
  const ISBN = req.params.ISBN;
  console.log("ISBN", ISBN);

  const searchPromise = new Promise((resolve, reject) => {
    const result = books.filter((book) => book.ISBN === ISBN);
    if (result.length > 0) {
      resolve(result);
    } else {
      reject("No se encontraron resultados");
    }
  });


  searchPromise
    .then((result) => {
      res.send(JSON.stringify( result , null, 2));
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify({ error }, null, 2));
    });
});

// booksRoutes.get("/search/author/:author", (req, res) => {
//   const author = req.params.author;
//   console.log("author", author);
//   const result = books.filter((book) => book.author === author);
//   result.length > 0
//     ? res.send(JSON.stringify({ result }, null, 2))
//     : res
//         .status(404)
//         .json({ message: "No se encontraron libros de ese autor." });
// });

booksRoutes.get("/search/author/:author", (req, res) => {
  const author = req.params.author;
  console.log("author", author);

  const searchPromise = new Promise((resolve, reject) => {
    const result = books.filter((book) => book.author === author);
    if (result.length > 0) {
      resolve(result);
    } else {
      reject("No se encontraron resultados de ese autor");
    }
  });

  searchPromise
    .then((result) => {
      res.send(JSON.stringify( result , null, 2));
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify({ error }, null, 2));
    });
});


// booksRoutes.get("/title/:title", (req, res) => {
//   const title = req.params.title;
//   const result = books.filter((book) => book.title === title);
//   result.length > 0
//     ? res.send(JSON.stringify({ result }, null, 2))
//     : res
//         .status(404)
//         .json({ message: "No se encontraron libros de ese autor." });
// });

booksRoutes.get("/title/:title", (req, res) => {
  const title = req.params.title;
  console.log("title", title);

  const searchPromise = new Promise((resolve, reject) => {
    const result = books.filter((book) => book.title === title);
    if (result.length > 0) {
      resolve(result);
    } else {
      reject("No se encontraron resultados de ese libro");
    }
  });

  searchPromise
    .then((result) => {
      res.send(JSON.stringify( result , null, 2));
    })
    .catch((error) => {
      res.status(404).send(JSON.stringify({ error }, null, 2));
    });
});


module.exports = booksRoutes;
