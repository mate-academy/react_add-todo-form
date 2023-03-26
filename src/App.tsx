import React, { useState } from 'react';
import './App.scss';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import usersFromServer from './api/users';
import { todoList, getTodoId, getUser } from './helpers/helpers';
import { TodoList } from './components/TodoList';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState(todoList);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^a-zA-Zа-яА-ЯіІїЇєЄ0-9\s]/g, ''));
    setTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserError(false);
  };

  const clearStates = () => {
    setTitle('');
    setUserId(0);
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() && userId) {
      const newTodo = {
        id: getTodoId(todos),
        title,
        userId,
        completed: false,
        user: getUser(userId),
      };

      setTodos([...todoList, newTodo]);
      clearStates();
    }

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }
  };

  return (
    <div className="App page">
      <h1 className="page__title mb-3">
        Add todo form
      </h1>

      <Form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <Form.Group className="mb-1 row">
          <Form.Label>
            Title:

            {titleError && (
              <span className="error"> Please enter a title</span>
            )}

            <Form.Control
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              name="title"
              value={title}
              onChange={handleTitleChange}
              size="sm"
            />
          </Form.Label>
        </Form.Group>

        <Form.Group className="mb-3 row">
          <Form.Label>
            User:

            {userError && (
              <span className="error"> Please choose a user</span>
            )}

            <Form.Select
              data-cy="userSelect"
              name="userId"
              value={userId}
              onChange={handleSelectChange}
              size="sm"
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map((user) => {
                const {
                  id,
                  name,
                } = user;

                return (
                  <option
                    value={id}
                    key={id}
                  >
                    {name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Label>
        </Form.Group>

        <div className="d-grid gap-2 mb-4">
          <Button
            type="submit"
            data-cy="submitButton"
            variant="dark"
          >
            Add
          </Button>
        </div>
      </Form>

      <TodoList todos={todos} />
    </div>
  );
};
