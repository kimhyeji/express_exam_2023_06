import express from "express";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "localhost",
  user: "korad",
  password: "kor123414",
  database: "music_list",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const app = express();
const port = 3000;

const musicList = [
  {
    title: "ditto",
    singer: "뉴진스",
  },
  {
    title: "Butter",
    singer: "BTS",
  },
];

app.get("/music_list", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM music_list ORDER BY id DESC");

  res.json(rows);
});

app.get("/music_list/:id", async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query("SELECT * FROM music_list WHERE id = ?", [
    id,
  ]);

  if (rows.length == 0) {
    res.status(404).send("not found");
    return;
  }

  res.json(rows[0]);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
