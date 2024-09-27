const db = require('../db');

const Task = {
  getAllTasks: (callback) => {
    db.query('SELECT * FROM tasks', callback);
  },

  addTask: (task, callback) => {
    const { description, priority, date_added } = task;
    db.query('INSERT INTO tasks (description, priority, date_added) VALUES (?, ?, ?)',
      [description, priority, date_added], callback);
  },

  updateTaskStatus: (id, done, callback) => {
    db.query('UPDATE tasks SET done = ? WHERE id = ?', [done, id], callback);
  },

  deleteCompletedTasks: (callback) => {
    db.query('DELETE FROM tasks WHERE done = true', callback);
  }
};

module.exports = Task;
