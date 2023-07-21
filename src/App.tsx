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

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.id),
}));

const getNewId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
};

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('0');
  const [selectedUserError, setSelectedUserError] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    if (title && (selectedUserId !== '0')) {
      const newTodo = {
        id: getNewId(todos),
        title,
        completed: false,
        userId: +selectedUserId,
        user: getUser(+selectedUserId),
      };

      setTodos(oldTodos => [...oldTodos, newTodo]);
      setTitle('');
      setSelectedUserId('0');
      setTitleError(false);
      setSelectedUserError(false);
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
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(event.target.value);
              setSelectedUserError(false);
            }}
          >
            <option value={0} disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {(selectedUserId === '0' && selectedUserError)
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
