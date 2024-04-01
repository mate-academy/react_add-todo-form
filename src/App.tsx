import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User, getUserById } from './types/user';
import { Todos } from './types/todos';

export const App = () => {
  const [todos, setTodos] = useState<Todos[]>(todosFromServer);
  const [selectedUser, setSelectedUser] = useState<User>({
    id: 0,
    name: '',
    username: '',
    email: '',
  });
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isSelectEmpty, setIsSelectEmpty] = useState(false);

  const onAdd = (todo: Todos) => {
    setTodos([...todos, todo]);
  };

  const formClear = () => {
    setSelectedUser({
      id: 0,
      name: '',
      username: '',
      email: '',
    });
    setNewTodoTitle('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTodoTitle || selectedUser.id === 0) {
      setIsTitleEmpty(!newTodoTitle.trim());
      setIsSelectEmpty(selectedUser.id === 0);

      return;
    }

    const maxId = todos.reduce(
      (max, todo) => (todo.id > max ? todo.id : max),
      0,
    );
    const newTodo: Todos = {
      id: maxId + 1,
      title: newTodoTitle,
      completed: false,
      userId: selectedUser.id,
    };

    onAdd(newTodo);
    formClear();
  };

  const handleInputBlur = () => {
    setIsTitleEmpty(!newTodoTitle.trim());
  };

  const handleSelectBlur = () => {
    setIsSelectEmpty(selectedUser.id === 0);
  };

  return (
    <div className="App">
      <TodoList todos={todos} />

      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            placeholder="Please text something"
            id="title"
            type="text"
            data-cy="titleInput"
            onChange={event => {
              setNewTodoTitle(event.target.value);
              setIsTitleEmpty(false);
            }}
            onBlur={handleInputBlur}
            value={newTodoTitle}
          />
          {isTitleEmpty && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>
          <select
            id="user"
            data-cy="userSelect"
            onChange={event => {
              setSelectedUser(getUserById(+event.target.value));
              setIsSelectEmpty(false);
            }}
            value={selectedUser.id}
            onBlur={handleSelectBlur}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isSelectEmpty && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </div>
  );
};
