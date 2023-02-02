import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: usersFromServer.find((user) => user.id === todo.userId) || null,
}));

const getTodo = (
  selectedUser: User,
  title: string,
  todos: Todo[],
): Todo => {
  const lastId = Math.max(...todos.map(todo => todo.id));

  return ({
    id: lastId + 1,
    title,
    completed: false,
    userId: selectedUser.id,
    user: selectedUser,
  });
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState(getTodos);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [title, setTitle] = useState('');
  const [userSelected, setUserSelected] = useState('0');

  const handleInputTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    setTitleError(false);
  };

  const handleSelectUser = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelected(event.target.value);

    setUserError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserSelected('0');
  };

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const currentUser = usersFromServer
      .find(user => user.name === userSelected) || null;

    if (!currentUser) {
      setUserError(true);
    }

    if (!title) {
      setTitleError(true);
    }

    if (currentUser && title) {
      const todo = getTodo(currentUser, title, getTodos);

      setTodos(current => ([
        ...current,
        todo,
      ]));

      resetForm();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddTodo}
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

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              value={userSelected}
              onChange={handleSelectUser}
            >
              <option value="0" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
