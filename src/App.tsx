import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getUser = (userId: number): User | null => {
  const findUser = usersFromServer.find(user => user.id === userId);

  return findUser || null;
};

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todoList, setTodoList] = useState(todos);

  const handleTitle = (value: string) => {
    const cleanTitle = new RegExp('[a-zA-Zа-яА-Я\\d ]+');
    const letter = value[value.length - 1];

    if (letter) {
      if (letter.search(cleanTitle) !== -1) {
        setTitle(value);
      }
    }

    setTitleError(false);
  };

  const handleUserId = (value: number) => {
    setUserId(value);

    setUserError(false);
  };

  const showErrors = () => {
    if (!title.trim()) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }
  };

  const addTodoList = (id: number) => {
    const passForm = () => {
      setTitleError(false);
      setUserError(false);
      setTitle('');
      setUserId(0);
    };

    if (userId && title.trim()) {
      const newId = Math.max(...todoList.map((todo) => todo.id)) + 1;

      const toCreate = {
        id: newId,
        title,
        completed: false,
        userId,
        user: getUser(id),
      };

      passForm();

      setTodoList((prev) => [...prev, toCreate]);
    }

    showErrors();
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodoList(userId);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            value={title}
            placeholder="Please enter a title"
            onChange={(e) => handleTitle(e.target.value)}
          />
          {
            titleError && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={(e) => handleUserId(+e.target.value)}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(({ name, id }) => (
              <option
                value={id}
                key={id}
              >
                {name}
              </option>
            ))}
          </select>
          {
            userError && <span className="error">Please choose a user</span>
          }
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todoList} />
    </div>
  );
};
