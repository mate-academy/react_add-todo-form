import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { UserInfo } from './components/UserInfo';
import { findUserById } from './helpers/findUserById';
import { Todo } from './types/Todo';

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setHasTitleError(!title.trim());
    setHasUserError(!userId);

    if (!title.trim() || !userId) {
      return;
    }

    const id = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const user = findUserById(usersFromServer, userId);

    setTodos([
      ...todos,
      {
        id: id,
        title: title,
        completed: false,
        userId: userId,
        user: user,
      },
    ]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <UserInfo
          userId={userId}
          onChange={setUserId}
          users={usersFromServer}
          hasError={hasUserError}
          setHasError={setHasUserError}
        />

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList users={usersFromServer} todos={todos} />
    </div>
  );
};
