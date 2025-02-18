import './App.scss';
import React, { FormEvent, useState } from 'react';
import { TodoForm } from './components/TodoForm';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { preparedTodos } from './api/constants/preparedTodos';

import usersFromServer from './api/users';

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Todo[]>(preparedTodos);

  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');

  const [errorUserId, setErrorUserId] = useState('');
  const [errorTitle, setErrorTitle] = useState('');

  const handleEnteredTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    if (errorTitle) {
      setErrorTitle('');
    }
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);

    if (errorUserId) {
      setErrorUserId('');
    }
  };

  const handleReset = () => {
    setUserId(0);
    setTitle('');
    setErrorTitle('');
    setErrorUserId('');
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setErrorTitle('Please enter a title');
    }

    if (userId === 0) {
      setErrorUserId('Please choose a user');
    }

    if (!title || userId === 0) {
      return;
    }

    const user = usersFromServer.find(
      userFromServer => userFromServer.id === userId,
    );

    const newTaskId =
      tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;

    const newTask: Todo = {
      id: newTaskId,
      title,
      userId,
      completed: false,
      user: user || null,
    };

    setTasks(currentTasks => [...currentTasks, newTask]);

    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm
        onSubmit={handleSubmit}
        onUserChange={handleUserSelect}
        onTitleChange={handleEnteredTitle}
        title={title}
        errorTitle={errorTitle}
        userId={userId}
        errorUserId={errorUserId}
      />

      <TodoList todos={tasks} />
    </div>
  );
};
