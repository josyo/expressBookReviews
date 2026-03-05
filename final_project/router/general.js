const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
const axios = require('axios');  // import axios



public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/async-books', async function(req, res) {
    try {
        // async/await version
        const response = await axios.get('http://localhost:5000/');
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get book details based on ISBN
public_users.get('/async-books/isbn/:isbn', async function(req, res) {
    const isbn = req.params.isbn;
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});
  
// Get book details based on Title
public_users.get('/async-books/title/:title', async function(req, res) {
    const title = req.params.title;
    try {
        const response = await axios.get(`http://localhost:5000/title/${title}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

// Get all books based on Author
public_users.get('/async-books/author/:author', async function(req, res) {
    const author = req.params.author;
    try {
        const response = await axios.get(`http://localhost:5000/author/${author}`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    if (books[isbn] && books[isbn].reviews) {
        return res.status(200).json(books[isbn].reviews);
    } else {
        return res.status(404).json({ message: "Book or reviews not found" });
    }
});

module.exports.general = public_users;
