import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

const getMaxId = (todos: Todo[]): number => {
  const todosOfId = todos.map(todo => todo.id);

  return Math.max(...todosOfId);
};

const makeNormalizedTodos = (todoList: Todo[]) => {
  return todoList.map(todo => {
    const findUser = usersFromServer.find(user => user.id === todo.userId);

    return { ...todo, user: findUser };
  });
};

export const App = () => {
  const [todos, setTodos] = useState([...todosFromServer]);
  const [inputValue, setInputValue] = useState('');
  const [hasTitle, setHasTitle] = useState(true);
  const [userId, setUserId] = useState(0);
  const [isUserOption, setUserOption] = useState(true);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);

    if (event.target.value) {
      setHasTitle(true);
    }
  };

  const handleSelectionChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(+event.target.value);

    if (event.target.value) {
      setUserOption(true);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!inputValue.length || !userId) {
      setHasTitle(Boolean(inputValue.length));
      setUserOption(false);

      return;
    }

    if (inputValue.length || userId) {
      setTodos((currentTodo) => {
        const newTodo = {
          id: getMaxId(currentTodo) + 1,
          title: inputValue,
          completed: false,
          userId,
        };

        return [...currentTodo, newTodo];
      });
    }

    setInputValue('');
    setUserId(0);
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
          <label htmlFor="user-input">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="user-input"
            placeholder="Enter a title"
            value={inputValue}
            onChange={handleInputChange}
          />

          {!hasTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user-option">User: </label>
          <select
            data-cy="userSelect"
            id="user-option"
            value={userId}
            onChange={handleSelectionChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(({ id, name }) => {
              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {!isUserOption && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={makeNormalizedTodos(todos)} />
    </div>
  );
};
