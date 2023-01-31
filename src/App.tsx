import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

import { Todo } from './types/Todo';
import { User } from './types/User';

function UserId(id: number): User | null {
  const foundUserId = usersFromServer.find(u => u.id === id);

  return foundUserId || null;
}

const todos: Todo[] = todosFromServer.map(t => ({
  ...t,
  user: UserId(t.userId),
}));

export const App = () => {
  const [title, setTitle] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);

  const onAdd = () => {
    if (!title) {
      (setTitleError(true));
    }

    if (!selectedUser) {
      setUserError(true);
    }

    if (!title || !selectedUser) {
      return;
    }

    const newTodo = {
      id: visibleTodos.length + 1,
      title,
      completed: false,
      userId: selectedUser,
      user: usersFromServer.find(u => u.id === selectedUser) || null,
    };

    setVisibleTodos((prevState) => [
      ...prevState,
      newTodo,
    ]);

    setTitle('');
    setSelectedUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          onAdd();
        }}
      >
        <div className="field">
          Title:&nbsp;
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitleError(false);
              setTitle(event.target.value);
            }}
          />
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:&nbsp;
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(+event.target.value);
              setUserError(false);
            }}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map(u => (
              <option value={u.id}>{u.name}</option>
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

      <TodoList todos={visibleTodos} />
    </div>
  );
};
