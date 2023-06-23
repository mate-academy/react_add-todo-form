import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const findUserById = (userId: number) => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const todoWithUsers = todosFromServer.map(todo => ({
  ...todo,
  user: findUserById(todo.userId),
}));

const calculateNewId = (array: Todo[]) => {
  const maxId = (Math.max(...array.map(element => element.id)));
  const newId = maxId + 1;

  return newId;
};

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

  const addNewTodo = (() => setTodos(prevTodos => {
    const newTodo = {
      id: calculateNewId(prevTodos),
      title,
      completed: false,
      userId: selectedOption,
      user: findUserById(selectedOption),
    };

    return ([...prevTodos, newTodo]);
  }));

  const handleFormSubmit = (
    (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      if (title.trim() && selectedOption) {
        addNewTodo();
        setTitle('');
        setSelectedOption(0);

        return;
      }

      if (!selectedOption) {
        setIsValidSelectedOption(false);
      }

      if (!title.trim()) {
        setIsValidTitle(false);
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

          {!isValidSelectedOption && (
            <span className="error">Please choose a user</span>)}
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
