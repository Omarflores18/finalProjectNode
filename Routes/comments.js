const express = require("express");
const commentsRoutes = express.Router();

let comments = [
  {
    idComment: 1,
    bookName: "Aura",
    commentDate: "2023-10-06",
    commentedBy: "John Doe",
    commentText: "Good book!",
  },
  {
    idComment: 2,
    bookName: "Aura",
    commentDate: "2023-11-06",
    commentedBy: "Carlos Suarez",
    commentText: "This book is amazing!",
  },
  {
    idComment: 3,
    bookName: "Clean Architecture",
    commentDate: "2023-11-06",
    commentedBy: "Omar Flores",
    commentText: "Good book!",
  },
];

const getCommentsByBook = (resultComments) => {
  const arrarComments = [];
  resultComments.forEach((element) => {
    arrarComments.push({
      commentDate: element.commentDate,
      commentText: element.commentText,
    });
  });
  return arrarComments;
};

commentsRoutes.get("/", (req, res) => {
  res.send(JSON.stringify({ comments }, null, 4));
});

commentsRoutes.get("/book/:bookName", (req, res) => {
  const bookName = req.params.bookName;
  const resultComments = comments.filter(
    (comment) => comment.bookName === bookName
  );
  if (resultComments.length > 0) {
    const arrayComments = getCommentsByBook(resultComments);
    res.send(JSON.stringify({ arrayComments }, null, 2));
  } else {
    res.send(JSON.stringify("No se encontraron comentarios"), null, 2);
  }
});

// POST request: update comment
commentsRoutes.post("/update", (req, res) => {
  // Update the code here
  const id = req.body.id;
  const comment = req.body.comment;

  // Usar un bucle for para buscar el comentario por ID
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].idComment === id) {
      comments[i].commentText = comment;
      return res.status(200).json({ message: "El comentario se actualizó correctamente" });
    }
  }

  res.send("No se actualizo"); //This line is to be replaced with actual return value
});

// POST request: delete comment
commentsRoutes.post("/delete/:id", (req, res) => {
  // Update the code here
  const id = req.params.id;
  // Usar un bucle for para buscar el comentario por ID
  for (let i = 0; i < comments.length; i++) {
    if (comments[i].idComment == id) {
      comments.splice(i, 1)
      return res.status(200).json({ message: "El comentario se elimino correctamente" });
    }
  }

  res.send("No se elimino el comentario"); //This line is to be replaced with actual return value
});

module.exports = commentsRoutes;
