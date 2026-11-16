import { useState, type FormEvent } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import type { Todo } from './components/TodoInfo';
import type { User } from './components/UserInfo';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(() =>
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedTitle = title.trim();

    const selectedUser = usersFromServer.find(
      user => user.id === selectedUserId,
    );

    const hasTitle = normalizedTitle.length > 0;

    setTitleError(!hasTitle);
    setUserError(!selectedUser);

    if (!hasTitle || !selectedUser) {
      return;
    }

    const newTodo: Todo = {
      id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
      title: normalizedTitle,
      userId: selectedUser.id,
      completed: false,
      user: selectedUser as User,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setSelectedUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>

          <input
            type="text"
            id="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              const newTitle = event.target.value.replace(
                /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]/g,
                '',
              );

              setTitle(newTitle);
              setTitleError(false);
            }}
          />

          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>

          <select
            id="user"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(Number(event.target.value));
              setUserError(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && (
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
