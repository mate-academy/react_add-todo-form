import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

import { Todo } from './types/todo';
import { User } from './types/User';

function getPreparedUsersFromServer(data: User[]) {
  const defaultUserChoice: User = {
    id: 0,
    name: 'Choose a user',
    username: '',
    email: '',
  };

  const preparedTodoList = [defaultUserChoice, ...data];

  return preparedTodoList;
}

export const App = () => {
  const initialTodos = todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId)!,
  }));

  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(initialTodos);
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [errorTitle, setErrorTitle] = useState(false);
  const [errorSelect, setErrorSelect] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setErrorTitle(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userId = +event.target.value;

    setSelectedUserId(userId);
    setErrorSelect(false);
  };

  const preparedUsersFromServer = getPreparedUsersFromServer(usersFromServer);

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim() === '' || selectedUserId === 0) {
      if (title.trim() === '') {
        setErrorTitle(true);
      }

      if (selectedUserId === 0) {
        setErrorSelect(true);
      }

      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id), 0);

    const selectedUser = usersFromServer.find(
      user => user.id === selectedUserId,
    );

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId: selectedUserId,
      user: selectedUser!,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setSelectedUserId(0);
    setErrorTitle(false);
    setErrorSelect(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmitForm}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter title"
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={handleSelectChange}
            value={selectedUserId}
          >
            {preparedUsersFromServer.map((user: User) => (
              <option value={user.id} key={user.id} disabled={user.id === 0}>
                {user.name}
              </option>
            ))}
          </select>

          {errorSelect && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
