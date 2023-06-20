import React, { useState, useEffect } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import { findTodoUser, getUser, maxId } from './helpers/helpers';

export const App: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoUserName, setTodoUserName] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const [titleSpan, setTitleSpan] = useState('');
  const [userNameSpan, setUserNameSpan] = useState('');

  useEffect(() => {
    const updatedTodos: Todo[] = todosFromServer.map(todo => ({
      ...todo,
      user: getUser(todo.userId),
    }));

    setTodos(updatedTodos);
  }, []);

  const preventDefaultHandler = (event: { preventDefault: () => void }) => {
    event.preventDefault();
  };

  const addNewTodoHandler = () => {
    const newTodo: Todo = {
      id: maxId(todos) + 1,
      title: todoTitle,
      completed: false,
      userId: 2,
      user: findTodoUser(todoUserName),
    };

    if (!todoTitle) {
      setTitleSpan('Please enter a title');
    }

    if (!todoUserName) {
      setUserNameSpan('Please choose a user');
    }

    if (todoTitle && todoUserName) {
      setTodos((prevTodos) => [...prevTodos, newTodo]);
      setTodoTitle('');
      setTodoUserName('');
    }
  };

  const handleTitleChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;

    setTodoTitle(value);
    setTitleSpan('');
  };

  const handleUserChange = (event: { target: { value: any; }; }) => {
    const { value } = event.target;

    setTodoUserName(value);
    setUserNameSpan('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={preventDefaultHandler}>
        <div className="field">
          <label>
            Title:
            {' '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={todoTitle}
              onChange={handleTitleChange}
            />
          </label>
          <span className="error">{titleSpan}</span>
        </div>

        <div className="field">
          <label>
            User:
            {' '}
            <select
              data-cy="userSelect"
              value={todoUserName}
              onChange={handleUserChange}
            >
              <option
                disabled
                value=""
              >
                Choose a user
              </option>
              {usersFromServer.map(user => {
                const { id, name } = user;

                return (
                  <option key={id} value={`${name}`}>
                    {name}
                  </option>
                );
              })}
            </select>
            <span className="error">{userNameSpan}</span>
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={addNewTodoHandler}
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
