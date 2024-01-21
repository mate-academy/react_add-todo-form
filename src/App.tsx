import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoInfo } from './components/TodoInfo';
import { UserInfo } from './components/UserInfo';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [addTodos, setAddTodos] = useState(todosFromServer);

  const handleTitleChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    value: string,
  ) => {
    setter(value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number,
  ) => {
    setter(value);
    setHasUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title.trim());
    setHasUserIdError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const newId = Math.max(...addTodos.map(todo => todo.id), 0) + 1;

    const newTodo = {
      id: newId,
      title,
      completed: false,
      userId,
    };

    setAddTodos((prevTodos) => [...prevTodos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <TodoInfo
          value={title}
          label="Title: "
          onChange={(value) => handleTitleChange(setTitle, value)}
          hasError={hasTitleError}
        />

        <UserInfo
          value={userId}
          label="User: "
          users={usersFromServer}
          onChange={(value) => handleUserIdChange(setUserId, value)}
          hasError={hasUserIdError}
        />

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={addTodos}
        users={usersFromServer}
      />
    </div>
  );
};
