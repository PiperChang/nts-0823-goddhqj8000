const express = require("express");
const pool = require("../db/db_connect");
const crypto = require("crypto"); 

const router = express.Router();

router.get("/", (req, res) => {
  const idx = req.query["id"];
  pool.getConnection((err, connection) => {
    const sql = `SELECT * from POST where (id=${idx})`;
    connection.query(sql, (err, rows) => {
      res.json({ id: `받은 것 : ${idx + rows}+1` });
    });
    connection.release();
  });
});

router.post("/", (req, res) => {
  // hashtag 관련 내용 안 넣었음
  password = crypto.createHash("sha256").update(req.body.password).digest("base64");
  console.log(password);
  // salt 추가할 것
  const con = pool.getConnection((err, connection) => {
    const sql = `insert into post(title, writer, content, password) values("${req.body.title}","${req.body.writer}","${req.body.content}","${password}")`;
    connection.query(sql, (err, rows) => {
      if (err)
        console.log(err);
  
      res.status(200).send("Post has created")
    });
    connection.release();
  });
});

router.put("/",(req,res)=>{
  const con = pool.getConnection((err, connection) => {
    const sql = `update post set title="${req.body.title}",content="${req.body.content}" where (id=${req.body.id})`
    connection.query(sql, (err, rows) => {
      if (err) 
        res.send(err)
      else
        res.status(200).send("Post has edited");
    });
    connection.release();
  });
})


router.delete("/",(req,res)=>{
  const con = pool.getConnection((err, connection) => {
    const sql = `delete from post where (id=${req.body.id})`
    connection.query(sql, (err, rows) => {
      if (err) 
        res.send(err)
      else
        res.status(200).send("Post has deleted");
    });
    connection.release();
  });
})

module.exports = router;
