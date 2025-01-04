import React, { useState } from 'react';
import './App.scss';
import { UserInfo } from './components/UserInfo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

type TodoProps = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  name: string;
};

export const App: React.FC<TodoProps> = () => {
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorSelect, setErrorSelect] = useState(false);
  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState(0);
  const [todos, setTodos] = useState(todosFromServer);

  function cleanForm() {
    setTitle('');
    setSelectUser(0);
    setErrorTitle(false);
    setErrorSelect(false);
  }

  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTitle(event.target.value);
    setErrorTitle(false);
  }

  function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectUser(+event.target.value);
    setErrorSelect(false);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setErrorTitle(!title);
    setErrorSelect(selectUser === 0);

    if (!title || selectUser === 0) {
      return;
    }

    const selectedUser = usersFromServer.find(user => user.id === selectUser);
    const userName = selectedUser ? selectedUser.name : 'Unknown';

    const newTodo: TodoProps = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title,
      userId: selectUser,
      completed: false,
      name: userName,
    };

    setTodos([...todos, newTodo]);
    cleanForm();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="post-title">
            Title:&nbsp;&nbsp;
          </label>
          <input
            id="post-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="post-user">
            User:&nbsp;&nbsp;
          </label>
          <select
            id="post-user"
            data-cy="userSelect"
            required
            value={selectUser}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            <UserInfo users={usersFromServer} />
          </select>
          {errorSelect && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList users={usersFromServer} todos={todos} />
    </div>
  );
};
