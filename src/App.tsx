import { useState } from 'react';
import './App.scss';
import 'bulma/css/bulma.css';

import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';

import {
  findUserByID,
  getPreparedTodos,
  getHighestTodoID,
} from './helpers/helpers';

export const App: React.FC = () => {
  const [todos, setTodos] = useState(getPreparedTodos);
  const [title, setTitle] = useState('');
  const [selectedUserID, setSelectedUserID] = useState(0);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserIdEmpty, setIsUserIdEmpty] = useState(false);

  const clearForm = () => {
    setTitle('');
    setSelectedUserID(0);
    setIsTitleEmpty(false);
    setIsUserIdEmpty(false);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);

    if (isTitleEmpty) {
      setIsTitleEmpty(false);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserID(+event.currentTarget.value);

    if (isUserIdEmpty) {
      setIsUserIdEmpty(false);
    }
  };

  const handleFormSubmit = () => {
    if (!title || !selectedUserID) {
      setIsTitleEmpty(!title);
      setIsUserIdEmpty(!selectedUserID);

      return;
    }

    const newTodo = {
      id: getHighestTodoID(todos),
      title,
      completed: false,
      userId: selectedUserID,
      user: findUserByID(selectedUserID),
    };

    setTodos((prevTodos => [...prevTodos, newTodo]));

    clearForm();
  };

  return (
    <div className="App section content">
      <h1 className="title is-1">Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          handleFormSubmit();
        }}
      >
        <div className="field">
          <label>
            <input
              type="text"
              placeholder="Write your title"
              className="input"
              data-cy="titleInput"
              value={title}
              onChange={handleTitleChange}
            />

            {isTitleEmpty && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field select mr-2">
          <select
            data-cy="userSelect"
            value={selectedUserID}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {isUserIdEmpty && (
            <span className="error">Please choose a user</span>
          )}
        </div>
        <button type="submit" className="button mb-5" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
