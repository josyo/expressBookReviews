const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');


/* ---------------- TASK 1 ---------------- */
/* Get all books */

public_users.get('/', function (req, res) {
  return res.status(200).json(books);
});


/* ---------------- TASK 2 ---------------- */
/* Get book by ISBN */

public_users.get('/isbn/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn]);
  }

  return res.status(404).json({ message: "Book not found" });

});


/* ---------------- TASK 3 ---------------- */
/* Get books by author */

public_users.get('/author/:author', function (req, res) {

  const author = req.params.author;

  let filteredBooks = {};

  Object.keys(books).forEach((isbn) => {
    if (books[isbn].author === author) {
      filteredBooks[isbn] = books[isbn];
    }
  });

  return res.status(200).json(filteredBooks);

});


/* ---------------- TASK 4 ---------------- */
/* Get books by title */

public_users.get('/title/:title', function (req, res) {

  const title = req.params.title;

  let filteredBooks = {};

  Object.keys(books).forEach((isbn) => {
    if (books[isbn].title === title) {
      filteredBooks[isbn] = books[isbn];
    }
  });

  return res.status(200).json(filteredBooks);

});


/* ---------------- TASK 5 ---------------- */
/* Get book reviews */

public_users.get('/review/:isbn', function (req, res) {

  const isbn = req.params.isbn;

  if (books[isbn]) {
    return res.status(200).json(books[isbn].reviews || {});
  }

  return res.status(404).json({ message: "Book not found" });

});


/* ---------------- TASK 10 ---------------- */
/* Async: Get all books */

public_users.get('/async-books', async function(req, res) {

  try {

    const response = await axios.get('http://localhost:5000/');

    return res.status(200).json(response.data);

  } catch (error) {

    return res.status(500).json({ message: error.message });

  }

});


/* ---------------- TASK 11 ---------------- */
/* Async: Get book by ISBN */

public_users.get('/async-books/isbn/:isbn', async function(req, res) {

  const isbn = req.params.isbn;

  try {

    const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);

    return res.status(200).json(response.data);

  } catch (error) {

    return res.status(404).json({ message: error.message });

  }

});


/* ---------------- TASK 12 ---------------- */
/* Async: Get books by author */

public_users.get('/async-books/author/:author', async function(req, res) {

  const author = req.params.author;

  try {

    const response = await axios.get(`http://localhost:5000/author/${author}`);

    return res.status(200).json(response.data);

  } catch (error) {

    return res.status(404).json({ message: error.message });

  }

});


/* ---------------- TASK 13 ---------------- */
/* Async: Get books by title */

public_users.get('/async-books/title/:title', async function(req, res) {

  const title = req.params.title;

  try {

    const response = await axios.get(`http://localhost:5000/title/${title}`);

    return res.status(200).json(response.data);

  } catch (error) {

    return res.status(404).json({ message: error.message });

  }

});


module.exports.general = public_users;