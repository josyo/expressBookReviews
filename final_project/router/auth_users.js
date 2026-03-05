const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    return users.some(user => user.username === username);
};

const authenticatedUser = (username,password) => {
    return users.some(user => user.username === username && user.password === password);
};

//only registered users can login
regd_users.post("/login",(req,res)=>{

  const username = req.body.username;
  const password = req.body.password;

  if(authenticatedUser(username,password)){

    let accessToken = jwt.sign(
      {data:password},
      'fingerprint_customer',
      {expiresIn:60*60}
    );

    req.session.authorization = {
      accessToken,
      username
    };

    return res.status(200).send("User successfully logged in");

  }

  return res.status(208).json({message:"Invalid Login"});
});



// Add a book review
regd_users.put("/auth/review/:isbn",(req,res)=>{

  const username = req.session.authorization.username;
  const isbn = req.params.isbn;
  const review = req.query.review;
  books[isbn].reviews[username] = review;

  return res.status(200).json({message:"Review added/updated"});
});

regd_users.delete("/auth/review/:isbn",(req,res)=>{

  const username = req.session.authorization.username;

  const isbn = req.params.isbn;

  delete books[isbn].reviews[username];

  return res.status(200).json({message:"Review deleted"});

});

//Add new User
regd_users.post("/register",(req,res)=>{

  const username = req.body.username;
  const password = req.body.password;

  if(!username || !password){
    return res.status(400).json({message:"Username and password required"});
  }

  if(isValid(username)){
    return res.status(404).json({message:"User already exists"});
  }

  users.push({"username":username,"password":password});

  return res.status(200).json({message:"User successfully registered"});

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
