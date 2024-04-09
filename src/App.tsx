import './App.scss';

import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { getUserById } from './services/user';
import { useState } from 'react';
import { Task } from './types/Task';

export const initialTasks: Task[] = todosFromServer.map(task => ({
  ...task,
  user: getUserById(task.userId),
}));

function getNewTaskId(tasks: Task[]) {
  const maxId = Math.max(...tasks.map(task => task.id));

  return maxId + 1;
}

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const addTask = ({ id, ...data }: Task) => {
    const newTask = {
      ...data,
      id: getNewTaskId(tasks),
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
