const router = require("express").Router();

const Todo = require("../models/Todo");

router.get("/allTodo", async (req, res) => {
  try {
    const allTodo = await Todo.find();
    res.status(200).json({ status: "OK", todos: allTodo });
  } catch (err) {
    res.status(403).json({ status: "NO" });
  }
});

router.post("/addTodo", async (req, res) => {
  const { todo } = req.body;

  const newTodo = new Todo({ todo });

  newTodo
    .save()
    .then(() => {
      res.status(200).json({ status: "OK" });
    })
    .catch((err) => res.status(403).json({ status: "NO" }));
});

router.post("/deleteTodo/:todoID", async (req, res) => {
  const { todoID } = req.params;

  Todo.deleteOne({ _id: todoID })
    .then(() => {
      res.status(200).json({ status: "OK" });
    })
    .catch((err) => res.status(403).json({ status: "NO" }));
});

module.exports = router;
