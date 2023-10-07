const express = require('express');
const commentsRoutes = express.Router();

let comments = [
    {
      firstName: "John",
      lastName: "wick",
      email: "johnwick@gamil.com",
      DOB: "22-01-1990",
    },
    {
      firstName: "John",
      lastName: "smith",
      email: "johnsmith@gamil.com",
      DOB: "21-07-1983",
    },
    {
      firstName: "Joyal",
      lastName: "white",
      email: "joyalwhite@gamil.com",
      DOB: "21-03-1989",
    },
  ];

  commentsRoutes.get("/",(req,res)=>{
    res.send(JSON.stringify({comments},null,4));
  });

  module.exports = commentsRoutes;