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
  currentUser: User,
  title: string,
  todos: Todo[],
): Todo => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return ({
    id: maxId + 1,
    title,
    completed: false,
    userId: currentUser.id,
    user: currentUser,
  });
};

export const App = () => {
  const [userSelected, setUserSelected] = useState('');
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(getTodos);

  const handleChangeTitle = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);

    setTitleError(false);
  };

  const handleSelectUser = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setUserSelected(event.target.value);

    setUserError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserSelected('');
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
              onChange={handleChangeTitle}
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
              <option value="" disabled>Choose a user</option>

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
