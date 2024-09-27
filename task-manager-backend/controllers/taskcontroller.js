const Task = require('../models/task');

exports.getTasks = (req, res) => {
  Task.getAllTasks((err, results) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(results);
  });
};

exports.addTask = (req, res) => {
  const newTask = {
    description: req.body.description,
    priority: req.body.priority,
    date_added: new Date(),
  };
  Task.addTask(newTask, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.status(201).json({ id: result.insertId });
  });
};

exports.updateTaskStatus = (req, res) => {
  const { id, done } = req.body;
  Task.updateTaskStatus(id, done, (err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(200);
  });
};

exports.deleteCompletedTasks = (req, res) => {
  Task.deleteCompletedTasks((err) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.sendStatus(200);
  });
};
