import express from "express";
const port = process.env.PORT || 4000;

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Node.js & Express" });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
