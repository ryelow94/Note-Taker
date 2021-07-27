const express = require('express') 
const app = express() 
const PORT = 3000 
const path = require('path') 
const notes = require("./db/db.json") 
console.log(notes) 

var notesArray = []

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static('public'));


app.get("/", (req, res) => { 
    res.sendFile(path.join(__dirname, 'index.html'));
}) 
app.get("/notes", (req, res) => { 
    res.sendFile(path.join(__dirname, 'public/notes.html'));
}) 

app.get("*", (req, res) => { 
    res.json(notes)
}) 

app.post("/api/notes", (req, res) => {
    res.json(`${req.headers} request received`); 
    console.log(req.headers)
}) 

app.delete("/api/notes/:id", (req,res) => {
}) 


app.listen(PORT, () => 
console.log(`listening at port ${PORT}`)); 






