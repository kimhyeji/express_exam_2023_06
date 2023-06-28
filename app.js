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
app.use(express.json());
const port = 3000;

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

app.post("/music_list", async (req, res) => {
  const { title, singer } = req.body;

  if (!title) {
    res.status(404).json({
      msg: "title required",
    });
    return;
  }

  if (!singer) {
    res.status(404).json({
      msg: "singer required",
    });
    return;
  }

  const [rs] = await pool.query(
    `
    INSERT INTO music_list
    SET regDate = NOW(),
    title = ?,
    singer = ?
    `,
    [title, singer]
  );

  res.status(201).json({
    id: rs.insertId,
  });
});

app.patch("/music_list/:id", async (req, res) => {
  const { id } = req.params;
  const { title, singer } = req.body;

  const [rows] = await pool.query("SELECT * FROM music_list WHERE id = ?", [
    id,
  ]);

  if (rows.length == 0) {
    res.status(404).send("not found");
  }

  if (!title) {
    res.status(404).json({
      msg: "title required",
    });
    return;
  }

  if (!singer) {
    res.status(404).json({
      msg: "singer required",
    });
    return;
  }

  const [rs] = await pool.query(
    `
    UPDATE music_list
    SET title = ?,
    singer = ?
    WHERE id = ?
    `,
    [title, singer, id]
  );

  res.status(200).json({
    id,
    title,
    singer,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
