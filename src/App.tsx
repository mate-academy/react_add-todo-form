import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './components/TodoInfo';
import { User } from './components/UserInfo';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number): User | null => (
  usersFromServer.find(({ id }) => id === userId) || null
);

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [todoList, setTodoList] = useState(todos);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = /^[a-zA-Z0-9 ]*$/.test(event.target.value);

    if (titleError) {
      setTitleError(false);
    }

    if (isValid) {
      setTitle(event.target.value);
    }
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (userError) {
      setUserError(false);
    }

    setUserId(event.target.value);
  };

  const addTodoItem = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isError = false;

    if (!title.trim()) {
      setTitleError(true);
      isError = true;
    }

    if (userId === '0') {
      setUserError(true);
      isError = true;
    }

    if (isError) {
      return;
    }

    const id = todos
      .sort((prevTodo, nextTodo) => nextTodo.id - prevTodo.id)[0]?.id + 1;

    const user = getUserById(Number(userId));

    const todo = {
      id,
      title,
      userId: Number(userId),
      completed: false,
      user,
    };

    setTodoList([...todoList, todo]);
    setTitle('');
    setUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodoItem}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            placeholder="Choose a user"
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(userData => (
              <option
                value={userData.id}
                key={userData.id}
              >
                {userData.name}
              </option>
            ))}
          </select>

          {userError && (
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

      <TodoList todos={todoList} />
    </div>
  );
};
