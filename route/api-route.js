const router = require("express").Router();
const fs = require("fs");
const { nanoid } = require("nanoid");

router.get("/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

router.post("/notes", (req, res) => {
  console.log(req.body);
  let obj = {
    id: nanoid(7),
    title: req.body.title,
    text: req.body.text,
  };
  console.log(obj);
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    let db = JSON.parse(data);
    db.push(obj);
    console.log(db);
    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
      if (err) throw err;
      return res.json(db);
    });
});
});

router.delete("/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        if (err) throw err;
        const allNotes = JSON.parse(data);
        const deleteNote = req.params.id;

        const result = allNotes.filter(note => note.id != deleteNote);
            
        console.log(allNotes);
        console.log(result);
    
        fs.writeFile("./db/db.json", JSON.stringify(result), (err) =>{
            if (err) res.json ({ err: "error deleting"});
            res.json(result);
        });
    });
});


module.exports = router;