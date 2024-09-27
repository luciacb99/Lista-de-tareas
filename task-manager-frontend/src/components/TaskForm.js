import React, { useState } from 'react';

const TaskForm = ({ addTask }) => {
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Normal');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (description.trim()) {
      addTask({ description, priority });
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Escribe una tarea..."
        maxLength="100"
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Normal">Normal</option>
        <option value="Importante">Importante</option>
      </select>
      <button type="submit">Añadir Tarea</button>
    </form>
  );
};

export default TaskForm;
