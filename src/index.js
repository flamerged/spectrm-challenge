import express from "express";
const port = process.env.PORT || 4000;

const app = express();

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
