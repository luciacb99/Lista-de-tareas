const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/tasks', taskController.getTasks);
router.post('/tasks', taskController.addTask);
router.put('/tasks', taskController.updateTaskStatus);
router.delete('/tasks', taskController.deleteCompletedTasks);

module.exports = router;
