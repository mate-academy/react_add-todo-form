import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { UserInfo } from './components/UserInfo';
import todos from './api/todos';
import { Task } from './types/Task';
import users from './api/users';

export const App = () => {
  const [tasks, setTasks] = useState<Task[]>(todos);

  const addTask = (title: string, employeeId: number) => {
    setTasks(prevTasks => {
      const maxId = prevTasks.reduce((max, task) => Math.max(max, task.id), 0);

      return [
        ...prevTasks,
        {
          id: maxId + 1,
          title,
          completed: false,
          userId: employeeId,
          user: users.find(user => user.id === employeeId),
        },
      ];
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <UserInfo addTask={addTask} />
      <TodoList tasks={tasks} />
    </div>
  );
};
