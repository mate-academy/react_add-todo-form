import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [titleError, setTitleError] = useState(false);
  const [authorError, setAuthorError] = useState(false);

  const handlerTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError(false);
  };

  const handlerAuthor = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAuthor(e.target.value);
    setAuthorError(false);
  };

  const mergeData = todos.map(todo => {
    const matchedUser = usersFromServer.find(
      (user: User) => user.id === todo.userId,
    );

    return {
      ...todo,
      user: matchedUser || null,
    };
  });

  const handlerAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let isValid = true;

    if (!title.trim()) {
      setTitleError(true);
      isValid = false;
    }

    if (!author) {
      setAuthorError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const newId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

    const newTodo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: Number(author),
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setAuthor('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handlerAdd}>
        <div className="field">
          <label htmlFor="title-input">Title</label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handlerTitle}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select data-cy="userSelect" onChange={handlerAuthor}>
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {author}

          {authorError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={mergeData} />
    </div>
  );
};
