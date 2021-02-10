import express from "express";

import { db } from "./config/db";

db.authenticate()
  .then(() => console.log(`connected to ${process.env.NODE_ENV} db`))
  .catch((error) =>
    console.log("something went wrong connecting to the database: " + error)
  );

const port = process.env.PORT || 4000;

const app = express();

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Welcome to Node.js & Express" });
// });

// app.get("/message/:id", (req, res) => {
//   console.log(parseInt(req.params.id) + 5);
//   res
//     .status(200)
//     .json({ message: `Yes hello this is message ${req.params.id}` });
// });

// Routes todo

// Get all messages

// Get single message by ID

// Create a message

// Update a message by ID

// delete a message by ID

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
