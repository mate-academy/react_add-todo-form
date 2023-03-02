import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types/Todo';
import { User } from './components/types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';

const getUser = (userId: number): User | null => {
  return usersFromServer.find(user => user.id === userId) || null;
};

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const regEx = /([A-Z]|[А-Я]|\d|\s)/gi;

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isNotSelected, setIsNotSelected] = useState(false);
  const [todoList, setTodoList] = useState(todos);

  const clearEntry = () => {
    setTitle('');
    setUser('');
  };

  const handleTodoAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    setIsTitleEmpty(!title.trim());
    setIsNotSelected(!user);
    if (title && user) {
      setTodoList([...todoList, {
        id: Math.max(...todoList.map(todo => todo.id)) + 1,
        title,
        userId: +user,
        completed: false,
        user: getUser(+user),
      }]);
      clearEntry();
    }
  };

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value.slice(-1).match(regEx)) {
      setTitle(value);
      setIsTitleEmpty(false);
    }
  };

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUser(value);
    setIsNotSelected(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleInput}
            placeholder="Enter a title"
          />
          {isTitleEmpty && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={user}
            onChange={handleUserSelect}
            placeholder="select a user"
          >
            <option
              value=""
            >
              Choose a user
            </option>
            {usersFromServer.map(userFromServer => (
              <option
                value={userFromServer.id}
                key={userFromServer.id}
              >
                {userFromServer.name}
              </option>
            ))}
          </select>

          {isNotSelected && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleTodoAdd}
        >
          Add
        </button>
      </form>
      <TodoList todos={todoList} />
    </div>
  );
};
