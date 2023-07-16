import { FormEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

const getUser = (userId: number) => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const completeTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.id),
}));

const getHeighestId = (todos: Todo[]) => {
  return todos.reduce((result, next) => Math.max(result, next.id), 0);
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState(completeTodos);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectedUser, setSelectedUser] = useState('0');
  const [selectedUserError, setSelectedUserError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (title && (selectedUser !== '0')) {
      setTodos(oldTodos => {
        const tasks = [...oldTodos];

        tasks.push({
          id: getHeighestId(tasks) + 1,
          title,
          completed: false,
          userId: +selectedUser,
          user: getUser(+selectedUser),
        });

        setTitle('');
        setSelectedUser('0');
        setTitleError(false);
        setSelectedUserError(false);

        return tasks;
      });
    } else {
      setTitleError(true);
      setSelectedUserError(true);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>

          <input
            type="text"
            value={title}
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />

          {(!title && titleError)
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="selectedUser">User: </label>

          <select
            data-cy="userSelect"
            name="selectedUser"
            id="selectedUser"
            value={selectedUser}
            onChange={(event) => {
              setSelectedUser(event.target.value);
              setSelectedUserError(false);
            }}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {(selectedUser === '0' && selectedUserError)
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
