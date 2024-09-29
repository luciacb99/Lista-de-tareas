import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
        localStorage.setItem('tasks', JSON.stringify(response.data)); 
      } catch (error) {
        console.error('Error al cargar las tareas', error);
        const storedTasks = JSON.parse(localStorage.getItem('tasks'));
        if (storedTasks) {
          setTasks(storedTasks); 
        }
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', newTask);
      setTasks([...tasks, { ...newTask, id: response.data.id, date_added: new Date() }]);
    } catch (error) {
      console.error('Error al añadir la tarea', error);
    }
  };


  const toggleTask = async (id) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task;
    });
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));

    try {
      await axios.put('http://localhost:5000/api/tasks', { id, done: !tasks.find(task => task.id === id).done });
    } catch (error) {
      console.error('Error al actualizar la tarea', error);
    }
  };

  const deleteTask = async (id) => {
    setTasks(tasks.filter(task => task.id !== id));
    localStorage.setItem('tasks', JSON.stringify(tasks.filter(task => task.id !== id)));

    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    } catch (error) {
      console.error('Error al eliminar la tarea', error);
    }
  };
  const clearCompletedTasks = async () => {
    setTasks(tasks.filter(task => !task.done));

    try {
      await axios.delete('http://localhost:5000/api/tasks');
    } catch (error) {
      console.error('Error al eliminar las tareas completadas', error);
    }
  };

  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} toggleTask={toggleTask} deleteTask={deleteTask} />
        ))}
      </ul>
      <button onClick={clearCompletedTasks}>Limpiar Tareas Completadas</button>
    </div>
  );
};

export default TaskList;
