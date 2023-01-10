import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getUser = (userId: number) => {
  const getUserById = usersFromServer.find(user => userId === user.id);

  return getUserById || null;
};

const todosWithUsers: Todo[] = todosFromServer.map(todo => (
  {
    id: todo.id,
    title: todo.title,
    completed: todo.completed,
    user: getUser(todo.userId),
  }
));

const userNames: string[] = usersFromServer.map(user => user.name);

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState(todosWithUsers);
  const [titleIsDeclared, setTitleIsDeclared] = useState(true);
  const [userIsSelected, setUserIsSelected] = useState(true);

  const addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setTitle(value);
    setTitleIsDeclared(true);
  };

  const addUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setSelectedUser(value);
    setUserIsSelected(true);
  };

  const addTodo = () => {
    if (title.trim() && selectedUser) {
      const getUserByName = (name: string) => {
        const findUserByName = usersFromServer.find(
          user => name === user.name,
        );

        return findUserByName || null;
      };

      const arrId = todos.map(todo => todo.id);
      const newId = Math.max(...arrId) + 1;

      const newTodo: Todo = {
        id: newId,
        title,
        completed: false,
        user: getUserByName(selectedUser),
      };

      setTodos([
        ...todos,
        newTodo,
      ]);

      setTitle('');
      setSelectedUser('');
    }

    if (!title.trim()) {
      setTitleIsDeclared(false);
    }

    if (!selectedUser) {
      setUserIsSelected(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="field">
          <label>
            <span>Title: </span>
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              placeholder="Add a title"
              value={title}
              onChange={addTitle}
            />
          </label>
          {!titleIsDeclared && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              name="user"
              value={selectedUser}
              onChange={addUser}
            >
              <option value="" disabled>Choose a user</option>
              {userNames.map(userName => (
                <option
                  key={userName}
                  value={userName}
                >
                  {userName}
                </option>
              ))}
            </select>
          </label>

          {!userIsSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={addTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
