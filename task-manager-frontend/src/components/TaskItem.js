import React from 'react';

const TaskItem = ({ task, toggleTask, deleteTask }) => {
  return (
    <li className={task.done ? 'completed' : ''}>
      <span>{task.description} - {task.priority} - {new Date(task.date_added).toLocaleString()}</span>
      <input
        type="checkbox"
        checked={task.done}
        onChange={() => toggleTask(task.id)}
      />
      <button onClick={() => deleteTask(task.id)}>Eliminar</button>
    </li>
  );
};

export default TaskItem;
