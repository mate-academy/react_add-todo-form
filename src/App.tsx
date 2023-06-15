import React, { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [stateTodos, setStateTodos] = useState(todos);
  const [formData, setFormData] = useState({
    titleInput: '',
    userSelect: 'Choose',
  });
  const [errorState, setErrorState] = useState({
    showErrorInput: true,
    showErrorSelect: true,
  });

  const handlerSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [input, select] = e.target;
    const inputValue = (input as HTMLInputElement).value;
    const selectValue = +(select as HTMLSelectElement).value;

    if (!inputValue || !selectValue) {
      setErrorState({
        showErrorInput: !!inputValue,
        showErrorSelect: !!selectValue,
      });

      return;
    }

    setStateTodos([...stateTodos, {
      id: stateTodos.length + 1,
      title: inputValue,
      completed: false,
      userId: selectValue,
      user: getUser(selectValue),
    }]);

    setFormData({ titleInput: '', userSelect: 'Choose' });
  };

  const handlerInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorState({
      showErrorInput: true,
      showErrorSelect: errorState.showErrorSelect,
    });
    setFormData({
      titleInput: e.target.value, userSelect: formData.userSelect,
    });
  };

  const handlerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setErrorState({
      showErrorInput: errorState.showErrorInput,
      showErrorSelect: true,
    });
    setFormData({
      titleInput: formData.titleInput, userSelect: e.target.value,
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handlerSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            name="titleInput"
            value={formData.titleInput}
            onChange={handlerInput}
          />
          <span
            className="error"
            hidden={errorState.showErrorInput}
          >
            Please enter a title
          </span>
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            id="userSelect"
            name="userSelect"
            value={formData.userSelect}
            onChange={handlerSelect}
          >
            <option value="Choose" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          <span
            className="error"
            hidden={errorState.showErrorSelect}
          >
            Please choose a user
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={stateTodos} />
    </div>
  );
};
