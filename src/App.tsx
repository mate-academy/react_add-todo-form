import { useState } from 'react';
import { TodoForm } from './components/TodoForm/TodoForm';
import { TodoList } from './components/TodoList';

import todosFromServer from './api/todos';
import { getUserId } from './services/userService';
import { Task } from './types/Task';
import React from 'react';

const initialTasks: Task[] = todosFromServer.map(task => ({
  ...task,
  user: getUserId(task.userId),
}));

const getNewTaskId = (tasks: Task[]) => {
  const maxId = Math.max(...tasks.map(task => task.id));

  return maxId + 1;
};

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = ({ id, ...data }: Task) => {
    const newTask = {
      id: getNewTaskId(tasks),
      ...data,
    };

    setTasks(currentTasks => [...currentTasks, newTask]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <TodoForm onSubmit={addTask} />
      <TodoList todos={tasks} />
    </div>
  );
};
