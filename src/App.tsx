import React, { useState } from 'react';
import { findById, addId } from './helpers';
import { User, Todos } from './types/types';
import { TodoList } from './components/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todos = todosFromServer.map(todo => {
  const user = usersFromServer.find(
    findById<User>(todo.userId),
  ) || null;

  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todos[]>(todos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isIdSelected, setIsIdSelected] = useState(false);

  const newTodo: Todos = {
    id: addId(todosList),
    title,
    completed: false,
    userId: selectedUserId,
    user: usersFromServer.find(
      findById<User>(selectedUserId),
    ) || null,
  };

  const handleValidation = () => {
    setIsTitleEmpty(!title);
    setIsIdSelected(!selectedUserId);
  };

  const clearForm = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleValidation();

    if (!title || !selectedUserId) {
      return;
    }

    setTodosList(prevTodosList => [...prevTodosList, newTodo]);
    clearForm();
  };

  const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsTitleEmpty(false);
  };

  const handleSelectUserId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+e.target.value);
    setIsIdSelected(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleInputTitle}
            />
          </label>
          {isTitleEmpty
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={handleSelectUserId}
            >
              <option value={0} disabled>Choose a user</option>
              {usersFromServer.map(({ id, name }) => (
                <option
                  key={id}
                  value={id}
                >
                  {name}
                </option>
              ))}
            </select>
          </label>

          {isIdSelected
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
