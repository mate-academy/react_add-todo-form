import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import './App.scss';

function getUserId(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const getTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserId(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(getTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectUser, setSelectUser] = useState(0);
  const [isErrorUser, setIsErrorUser] = useState(false);
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const maxId = todos.length > 0
    ? Math.max(...todos.map(todo => todo.id)) + 1
    : 1;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle) {
      setIsErrorTitle(true);
    }

    if (!selectUser) {
      setIsErrorUser(true);
    }

    if (selectUser && todoTitle) {
      const newTodo: Todo = {
        id: maxId,
        title: todoTitle,
        userId: selectUser,
        completed: false,
        user: getUserId(selectUser),
      };

      setTodos([...todos, newTodo]);
      setTodoTitle('');
      setSelectUser(0);
      setIsErrorUser(false);
      setIsErrorTitle(false);
    }
  };

  const handleChange = (event:
  React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;

    if (name === 'title') {
      setTodoTitle(value);
      setIsErrorTitle(false);
    }

    if (name === 'user') {
      setSelectUser(Number(value));
      setIsErrorUser(false);
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
          Title:
          <input
            type="text"
            name="title"
            value={todoTitle}
            onChange={handleChange}
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          {isErrorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:
          <select
            value={selectUser}
            onChange={handleChange}
            data-cy="userSelect"
          >
            <option
              disabled
              value={0}
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isErrorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
