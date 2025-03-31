import { useState } from 'react';
import './App.scss';
import todos from './api/todos';
import users from './api/users';
import { TodoList } from './components/TodoList';
import { Task } from './types/Task';
import { FormAddTask } from './components/FormInfo/FormAddTask';

// import { todo } from 'node:test';

export const App = () => {
  const preparedTodos = todos.map(task => ({
    ...task,
    user: users.find(user => +user.id === +task.userId) || null,
  }));

  const [tasks, setTasks] = useState<Task[]>(preparedTodos);
  const [usersData] = useState(users);

  const addTask = (title: string, employeeId: number) => {
    const foundUser = usersData.find(user => +user.id === +employeeId);

    setTasks(prevTasks => {
      const maxId = prevTasks.reduce((max, task) => Math.max(max, task.id), 0);

      return [
        ...prevTasks,
        {
          id: maxId + 1,
          title,
          completed: false,
          userId: employeeId,
          user: foundUser || null,
        },
      ];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <FormAddTask addTask={addTask} users={usersData} />
      <TodoList tasks={tasks} />
    </div>
  );
};
