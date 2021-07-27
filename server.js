const fs = require('fs');
const express = require('express') 
const app = express() 
const PORT = process.env.PORT || 3000
const path = require('path') 
let notes = require("./db/db.json") 
console.log(notes) 

app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(express.static('public'));

app.get("/", (req, res) => { 
    res.sendFile(path.join(__dirname, 'index.html'));
}) 
app.get("/notes", (req, res) => { 
    res.sendFile(path.join(__dirname, 'public/notes.html'));
}) 

app.get("/api/notes", (req, res) => { 
    res.json(notes)
}) 

app.post("/api/notes", (req, res) => { 
    console.log("inside api node", req.headers)
    console.log(notes) 
    const newNote = req.body 
    newNote.id= notes.length
    notes.push(newNote) 
    fs.writeFileSync("./db/db.json", JSON.stringify(notes)) 
    res.status(201).end()
    return res.json(notes)      
}) 


app.delete("/api/notes/:id", (req,res) => { 
    const id = req.params.id
    console.log(id)
    const filteredNotes = notes.filter((note) => note.id !== parseInt(id)) 
    console.log(filteredNotes)
    fs.writeFileSync("./db/db.json", JSON.stringify(filteredNotes)) 
    notes = filteredNotes
    return res.json({ok: true})
}) 

app.listen(PORT, () => 
console.log(`listening at port ${PORT}`)); 






