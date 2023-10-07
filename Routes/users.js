const express = require('express');
const usersRoutes = express.Router();

let users = [
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

  usersRoutes.get("/",(req,res)=>{
    res.send(JSON.stringify({users},null,4));
  });

  module.exports = usersRoutes;