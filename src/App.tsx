import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

const findUserById = (todoUserId: Todo['userId'], users:User[]) => {
  return users.find(user => user.id === todoUserId) || null;
};

const todoWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId, usersFromServer),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [selectedOption, setSelectedOption] = useState(0);
  const [isValidSelectedOption, setIsValidSelectedOption] = useState(true);
  const [todos, setTodos] = useState(todoWithUsers);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsValidTitle(true);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(+event.target.value);
    setIsValidSelectedOption(true);
  };

  const addNewTodo = (() => setTodos(prevTodos => [...prevTodos, {
    id: Math.max(...prevTodos.map(todo => todo.id)) + 1,
    title,
    completed: false,
    userId: selectedOption,
    user: findUserById(selectedOption, usersFromServer),
  }]));

  const handleFormSubmit = (
    (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (title.length && selectedOption !== 0) {
        addNewTodo();
        setTitle('');
        setSelectedOption(0);
      } else {
        if (selectedOption === 0) {
          setIsValidSelectedOption(false);
        }

        if (title.length === 0) {
          setIsValidTitle(false);
        }
      }
    });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleFormSubmit}>
        <div className="field">
          <label htmlFor="title">{'Title: '}</label>

          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleInputChange}
          />
          {!isValidTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">{'User: '}</label>

          <select
            data-cy="userSelect"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {!isValidSelectedOption
          && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
