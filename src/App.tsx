import './App.scss';
import React, { FormEventHandler, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const mapedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const mapedUsers = usersFromServer.map(user => {
  const { id, name } = user;

  return (
    <option value={id} key={id}>{name}</option>
  );
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState(mapedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isValidTitle, setIsValidTitle] = useState(true);
  const [isValidUser, setIsValidUser] = useState(true);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (!title) {
      setIsValidTitle(false);
    }

    if (!userId) {
      setIsValidUser(false);
    }

    if (title && userId) {
      const addedTodoId = todosFromServer.reduce(
        (max, todosArr) => (
          todosArr.id > max ? todosArr.id : max
        ), 0,
      ) + 1;

      const addedTodo = {
        userId,
        title,
        id: addedTodoId,
        completed: false,
        user: getUser(userId),
      };

      setTitle('');
      setUserId(0);
      setIsValidTitle(true);
      setIsValidUser(true);
      setTodos([...todos, addedTodo]);
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsValidTitle(true);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsValidUser(true);
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
          <label htmlFor="title">
            Title:
          </label>

          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitle}
            id="title"
            placeholder="Enter title here"
          />

          {!isValidTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            User:
          </label>
          <select
            data-cy="userSelect"
            name="user"
            value={userId}
            onChange={handleUserId}
            id="user"
          >
            <option value="0" disabled>Choose a user</option>
            {mapedUsers}
          </select>

          {!isValidUser && (
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
