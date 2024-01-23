import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { TodoFromServer } from './types/TodoFromServer';

const getTodoId = () => {
  const ids = todosFromServer.map(todo => todo.id);

  return Math.max(...ids) + 1;
};

const getUser = (users: User[], userId: number) => {
  return users.find(user => user.id === userId) as User;
};

const getFoolTodo = (todos: TodoFromServer[], users: User[]) => {
  const foolTodo = todos.map(todo => {
    const userTodo = getUser(users, todo.userId);

    return {
      ...todo,
      user: userTodo,
    };
  });

  return foolTodo;
};

const todosForWork = getFoolTodo(todosFromServer, usersFromServer);

export const App = () => {
  const [todos, setTodos] = useState(todosForWork);
  const [userId, setUserId] = useState(0);
  const [hasUser, setHasUser] = useState(true);
  const [hasTitle, setHasTitle] = useState(true);

  const baseTodoId = {
    id: getTodoId(),
    title: '',
    completed: false,
    userId: 0,
    user: {
      id: 0,
      name: '',
      username: '',
      email: '',
    },
  };

  const [newTodo, setNewTodo] = useState(baseTodoId);

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setNewTodo(prevTodo => ({
      ...prevTodo,
      userId: +e.target.value,
      user: getUser(usersFromServer, +e.target.value),
    }));
    setHasUser(true);
  };

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(prevTodo => ({
      ...prevTodo,
      title: e.target.value.replace(/[^\d\s\u0400-\u04FFa-zA-Z]/g, ''),
    }));
    setHasTitle(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let hasErrorValid = false;

    if (userId === 0) {
      setHasUser(false);
      hasErrorValid = true;
    }

    if (newTodo.title.trim() === '') {
      setHasTitle(false);
      hasErrorValid = true;
    }

    if (hasErrorValid) {
      return;
    }

    setTodos(prevTodo => ([...prevTodo, newTodo]));
    setNewTodo(prevTodo => ({
      ...prevTodo,
      id: prevTodo.id + 1,
      title: '',
      userId: 0,
    }));
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title</label>
          <br />
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            id="title"
            onChange={handleChangeTitle}
            value={newTodo.title}
          />
          {hasTitle || <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">Choose a user</label>
          <br />
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
            id="userSelect"
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUser || <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
