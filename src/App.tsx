import { useState } from 'react';
import './App.scss';

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

  const handleFormSubmit = () => {
    if (!title || !selectedUserID) {
      setIsTitleEmpty(!title);
      setIsUserIdEmpty(!selectedUserID);

      return;
    }

    setTodos((prevTodos => {
      const newTodo = {
        id: getHighestTodoID(todos),
        title,
        completed: false,
        userId: selectedUserID,
        user: findUserByID(selectedUserID),
      };

      return [...prevTodos, newTodo];
    }));

    clearForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

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
              data-cy="titleInput"
              value={title}
              onChange={(event) => {
                setIsTitleEmpty(false);
                setTitle(event.currentTarget.value);
              }}
            />

            {isTitleEmpty && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserID}
            onChange={(event) => {
              setIsUserIdEmpty(false);
              setSelectedUserID(+event.currentTarget.value);
            }}
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

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
