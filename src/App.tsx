import React, { useState } from 'react';
import './App.scss';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const getIdForTodo = (todos: Todo[]) => {
  let biggest = 0;

  todos.forEach(todo => {
    if (todo.id > biggest) {
      biggest = todo.id;
    }
  });

  return biggest + 1;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [titleInput, setTitleInput] = useState('');
  const [titleSelectError, setTitleSelectError] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const [userSelectError, setUserSelectError] = useState(false);

  const clearForm = () => {
    setTitleInput('');
    setSelectedUser(0);
    setTitleSelectError(false);
    setUserSelectError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimedTitle = titleInput.trim();

    if (!trimedTitle || selectedUser === 0) {
      if (!trimedTitle) {
        setTitleSelectError(true);
      }

      if (selectedUser === 0) {
        setUserSelectError(true);
      }

      return;
    }

    const todo: Todo = {
      id: getIdForTodo(todos),
      title: titleInput,
      completed: false,
      userId: selectedUser,
      user: getUser(selectedUser),
    };

    setTodos((prevTodos) => [...prevTodos, todo]);
    clearForm();
  };

  const handleOnInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (titleSelectError) {
      setTitleSelectError(false);
    }

    setTitleInput(event.target.value.replace(/[^a-zа-я0-9\s]/gi, ''));
  };

  const handleOnSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (userSelectError) {
      setUserSelectError(false);
    }

    setSelectedUser(+event.target.value);
  };

  return (
    <section className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleInput}
            onChange={handleOnInput}
            placeholder="Enter a title here"
          />

          {titleSelectError && (
            <p className="error">Please enter a title</p>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            id="select"
            onChange={handleOnSelect}
            value={selectedUser}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(({ id, name }: User) => (
              <option value={id} key={id}>{name}</option>
            ))}
          </select>

          {userSelectError && (
            <p className="error">Please choose a user</p>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <div className="TodoList">
        <TodoList todos={todos} />
      </div>
    </section>
  );
};
