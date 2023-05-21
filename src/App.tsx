import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [newTodos, setNewTodos] = useState(todos);
  const [errorEmptyTitle, setErrorEmptyTitle] = useState(false);
  const [errorEmptyselectedUser, seterrorEmptyselectedUser] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const correctionTodo = (title: string, selectedUser: number) => {
    let correctTitle = '';

    if (title) {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < title.length; i++) {
        if ((title[i].toLocaleLowerCase() !== title[i].toLocaleUpperCase())
          || Number.isInteger(+title[i])) {
          correctTitle += title[i];
        }
      }
    }

    const newTodo = {
      title: correctTitle,
      userId: selectedUser,
      id: Math.max(...newTodos.map(todo => todo.id)) + 1,
      completed: false,
      user: getUser(selectedUser),
    };

    setNewTodos(arr => [...arr, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title && selectedUser) {
      correctionTodo(title, selectedUser);
      setTitle('');
      setSelectedUser(0);

      return;
    }

    setErrorEmptyTitle(true);
    seterrorEmptyselectedUser(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        onSubmit={handleSubmit}
        action="/api/users"
        method="POST"
      >
        <div className="field">
          <label>{'Title: '}</label>
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={
              (event) => {
                setTitle(event.target.value);
                setErrorEmptyTitle(false);
              }
            }
          />
          {errorEmptyTitle
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>{'User: '}</label>
          <select
            name="selectedUser"
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(+event.target.value);
              seterrorEmptyselectedUser(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorEmptyselectedUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
