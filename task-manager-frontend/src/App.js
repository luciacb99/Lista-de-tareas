import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Normal');

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);
  }, []);

  const addTask = () => {
    
    if (!description.trim()) {
      alert('No se puede agregar una  tarea vacia');
      return;
    }
  
    const newTask = {
      id: Date.now(),
      description,
      priority,
      dateAdded: new Date(),
      done: false,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    setDescription('');
  };

  const toggleTask = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  const clearDoneTasks = () => {
    const updatedTasks = tasks.filter(task => !task.done);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  return (
    <div>
      <header className="header">
        <h1>Lista De Tareas</h1>
      </header>
      <div className="container">
        <div className="task-input">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Escribe una tarea..."
            maxLength="255"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Normal">Normal</option>
            <option value="Importante">Importante</option>
          </select>
          <button onClick={addTask}>+</button>
        </div>
        <div className="task-list">
          {tasks.map(task => (
            <div key={task.id} className={`task ${task.done ? 'done' : ''} ${task.priority}`}>
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span>{task.description} ({task.dateAdded.toLocaleString()})</span>
            </div>
          ))}
        </div>
        <button className="clear-button" onClick={clearDoneTasks}>Borrar</button>
      </div>
    </div>
  );
}

export default App;