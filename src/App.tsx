import './App.scss';

import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [title, setTitle] = useState('');
  const [isTitleWrong, setIsTitleWrong] = useState(false);
  const [isUserWrong, setIsUserWrong] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  const addTodo = (id: number) => {
    const trimmedTitle = title.trim();

    const foundedUser = getUserById(id);
    const newId = Math.max(...todos.map(curr => curr.id)) + 1;

    if (!trimmedTitle) {
      setIsTitleWrong(true);
    }

    if (!selectedUser) {
      setIsUserWrong(true);
    }

    const todo = {
      id: newId,
      userId: id,
      title,
      completed: false,
      user: foundedUser,
    };

    if (foundedUser && title.trim()) {
      setVisibleTodos(prevTodos => [...prevTodos, todo]);
      setTitle('');
      setSelectedUser(0);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleWrong(false);
  };

  const handleUserSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setIsUserWrong(false);
  };

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo(selectedUser);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >

        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>

          {isTitleWrong && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleUserSelection}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUserWrong && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={visibleTodos} />
      </section>
    </div>
  );
};
