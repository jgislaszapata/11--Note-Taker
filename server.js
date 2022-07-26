const fs = require("fs");
const path = require("path");
const uuid = require("./helpers/uuid");

const express = require("express");
const app = express();

const dbNotes = require("./db/db");
const e = require("express");

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Route to index.html landing page
app.get("/", (request, response) => {
    // response.sendFile(path.join(__dirname, "/public/index.html"));
    response.sendFile(`${__dirname}/public/index.html`);
})

// Route to notes.html file 
app.get("/notes", (request, response) => {
    // response.sendFile(path.join(__dirname, "/public/notes.html"))
    response.sendFile(`${__dirname}/public/notes.html`);
})

// Route to read db.json file. 
app.get("/api/notes", (request, response) => {
    // console.log(request)
    response.json(dbNotes)
})

// Route that will receive new note and post it to the front end
app.post("/api/notes", (request, response) => {
const noteList = [];
request.body.id = uuid();
noteList.push(request.body);
console.log(noteList);

if (noteList.length > 0) {
    fs.writeFile("./db/db.json", JSON.stringify(noteList), error => {
        console.log("note saved successfully")
    })
} else {
    return error;
}
response.send(noteList);

// fs.writeFile("./db/db.json", JSON.stringify(dbNotes), error => {
//     console.log("note added")
// })
})

// Route that will delete a note
app.delete("api/notes/:id", (request, response) => {

})

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT} 🚀`)
})