import { useState } from 'react';
import './App.scss';
import { todosFromServer } from './api/todos';
import { usersFromServer } from './api/users';
import { TodoList } from './components/TodoList';
import { getUserById } from './components/helpers/getUserById';
import { TodoWithUser } from './Types/TodoWithUser';
import { findNewId } from './components/helpers/findNewId';

const todosWithUser = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId, usersFromServer),
  };
});

export const App = () => {
  const [todos, setTodos] = useState<TodoWithUser[]>(todosWithUser);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState('0');
  const [selectedUserIdError, setSelectedUserIdError] = useState(false);

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (selectedUserId === '0') {
      setSelectedUserIdError(true);
    }

    if (!title || selectedUserId === '0') {
      return;
    }

    const newTodo: TodoWithUser = {
      id: findNewId(todos),
      title,
      completed: false,
      userId: +selectedUserId,
      user: getUserById(+selectedUserId, usersFromServer),
    };

    setTodos(current => [...current, newTodo]);

    setTitle('');
    setSelectedUserId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddTodo}>
        <div className="field">
          <label htmlFor="title-input">Title: </label>
          <input
            placeholder="Enter a title"
            id="title-input"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value.trimStart());
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User: </label>

          <select
            id="user-select"
            data-cy="userSelect"
            defaultValue={selectedUserId}
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(event.target.value);
              setSelectedUserIdError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedUserIdError && (
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
