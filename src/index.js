import express from "express";
import models from "../models/index";

const port = process.env.PORT || 4000;
const { Message } = models;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes

// Get all messages

app.get("/messages", async (req, res) => {
  Message.findAll()
    .then((messages) => {
      const promises = [];
      messages.forEach((message) =>
        promises.push(message.increment("retrievedCounter"))
      );
      return Promise.all(promises);
    })
    .then((messages) => res.status(200).json(messages))
    .catch((error) => {
      console.log(error);
      res.status(404).json({ status: "failed", error: `${error}` });
    });
});

// Get single message by ID

app.get("/messages/:id", async (req, res) => {
  const id = req.params.id;

  Message.findAll({ where: { id } })
    .then((message) => {
      if (message.length > 0) {
        message[0].increment("retrievedCounter");
      } else {
        throw new Error("Message could not be found");
      }
      res.status(200).json(message);
    })
    .catch((error) => {
      console.log(error);
      res.status(404).json({ status: "failed", error: `${error}` });
    });
});

// Create a message

app.post("/messages/", async (req, res) => {
  const { content } = req.body;

  Message.create({ content })
    .then((message) => res.status(201).json({ status: "success", message }))
    .catch((error) => {
      console.log(error);
      res.status(400).json({ status: "failed", error: `${error}` });
    });
});

// Update a message by ID

app.put("/messages/:id", async (req, res) => {
  const changes = req.body;
  const id = req.params.id;

  Message.update({ ...changes }, { where: { id }, returning: true })
    .then((message) => {
      message = message[1][0].increment("retrievedCounter");
      return message;
    })
    .then((message) => {
      res.status(202).json({ status: "success", message });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ status: "failed", error: `${error}` });
    });
});

// delete a message by ID

app.delete("/messages/:id", async (req, res) => {
  const id = req.params.id;

  Message.destroy({ where: { id }, returning: true })
    .then((status) => {
      if (status === 0) {
        throw new Error("Message could not be found");
      }
      res.status(202).json({ status: "success" });
    })
    .catch((error) => {
      console.log(error);
      res.status(400).json({ status: "failed", error: `${error}` });
    });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
