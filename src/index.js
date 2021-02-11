import express from "express";
import { db } from "./config/db";
import models from "../models/index";
import { v4 as uuid } from "uuid";

const port = process.env.PORT || 4000;
const { Message } = models;

db.authenticate()
  .then(() => console.log(`connected to ${process.env.NODE_ENV} db`))
  .catch((error) =>
    console.log("something went wrong connecting to the database: " + error)
  );

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes todo

// Get all messages

app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).send(messages);
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: "failed", error: `${error}` });
  }
});

// Get single message by ID

app.get("/messages/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const message = await Message.findAll({ where: { id } });
    res.status(200).send(message);
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: "failed", error: `${error}` });
  }
});

// Create a message

app.post("/messages/", async (req, res) => {
  const { content } = req.body;
  console.log(req.body);
  const id = uuid();

  try {
    const message = await Message.create({ id, content, retrievedCounter: 0 });
    res.status(201).send(message);
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", error: `${error}` });
  }
});

// Update a message by ID

app.put("/messages/:id", async (req, res) => {
  const changes = req.body;
  const id = req.params.id;

  try {
    const message = await Message.update(
      { ...changes },
      { where: { id }, returning: true }
    );
    res.status(202).send({ status: "success", message: message[1][0] });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", error: `${error}` });
  }
});

// delete a message by ID

app.delete("/messages/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const message = await Message.destroy({ where: { id }, returning: true });
    if (message === 0) {
      throw new Error("Message could not be found");
    }
    res.status(202).send({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ status: "failed", error: `${error}` });
  }
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
