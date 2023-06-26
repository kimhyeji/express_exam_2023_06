import express from "express";

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

app.get("/music", (req, res) => {
  res.json(musicList);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
