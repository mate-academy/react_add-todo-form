import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { findUser, todos } from './utils/findUser';
import { createUserId } from './utils/createUserId';
import usersFromServer from './api/users';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const [todoList, setTodoList] = useState<Todo[]>(todos);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [isTitleErrorVisible, setIsTitleErrorVisible] = useState(false);
  const [isUserErrorVisible, setIsUserErrorVisible] = useState(false);

  const createNewTodo = () => ({
    id: createUserId(todoList),
    title: todoTitle,
    completed: false,
    userId: +selectedUserId,
    user: findUser(+selectedUserId),
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTodoTitle(event.target.value);
    setIsTitleErrorVisible(false);
  };

  const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(event.target.value);
    setIsUserErrorVisible(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsTitleErrorVisible(!todoTitle);
    setIsUserErrorVisible(!selectedUserId);

    if (todoTitle && selectedUserId) {
      setTodoList(currentTodoList => (
        [...currentTodoList, createNewTodo()]
      ));
      setTodoTitle('');
      setSelectedUserId('');
    }
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
          <span className="field__title">Title:</span>

          <input
            placeholder="Please enter a title"
            value={todoTitle}
            onChange={handleChange}
            type="text"
            data-cy="titleInput"
          />

          {isTitleErrorVisible && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <span className="field__title">User:</span>

          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={selectUser}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map((user) => {
              const { name, id } = user;

              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {isUserErrorVisible && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
