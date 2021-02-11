import express from "express";
import bodyParser from "body-parser";
import { db } from "./config/db";

const port = process.env.PORT || 4000;

db.authenticate()
  .then(() => console.log(`connected to ${process.env.NODE_ENV} db`))
  .catch((error) =>
    console.log("something went wrong connecting to the database: " + error)
  );

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded());

// Routes todo

// Get all messages

// Get single message by ID

// Create a message

// Update a message by ID

// delete a message by ID

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
