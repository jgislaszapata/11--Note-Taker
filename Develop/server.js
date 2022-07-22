const fs = require("fs");
const path = require("path");
const uuid = require("./helpers/uuid");

const express = require("express");
const app = express();

const dbNotes = require("./db/db");

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Route to index.html landing page
app.get("/", (request, response) => {
    response.sendFile(`${__dirname}/public/index.html`)
})

// Route to notes.html file 
app.get("/notes", (request, response) => {
    response.sendFile(`${__dirname}/public/notes.html`)
})

// Route to read db.json file. 
app.get("/api/notes", (request, response) => {
    console.log(dbNotes)
    response.json(dbNotes)
})

app.post("/api/notes", (request, response) => {
    
})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT} 🚀`)
})