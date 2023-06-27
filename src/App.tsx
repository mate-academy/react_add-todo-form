import { ChangeEvent, FormEvent, useState } from 'react';
import './App.scss';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todosWithUserProp: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, updateTodos] = useState(todosWithUserProp);
  const [user, setUser] = useState(0);
  const [title, setTitle] = useState('');
  const [hasUser, setHasUser] = useState(true);
  const [hasTitle, setHasTitle] = useState(true);

  const validateAndUpdateList = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() && user) {
      const newTodo = {
        id: Math.max(...todosFromServer.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId: user,
        user: getUser(user),
      };

      updateTodos([
        ...todos,
        newTodo,
      ]);

      setUser(0);
      setTitle('');

      return;
    }

    if (!title.trim()) {
      setHasTitle(false);
    }

    if (!user) {
      setHasUser(false);
    }
  };

  const updateTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setHasTitle(true);
    setTitle(event.target.value);
  };

  const selectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setHasUser(true);
    setUser(+event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        id="form"
        onSubmit={(event) => validateAndUpdateList(event)}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            value={title}
            onChange={event => updateTitle(event)}
            placeholder="Enter a title"
          />
          {!hasTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={user}
            onChange={event => selectUser(event)}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(userFromServer => (
              <option
                value={userFromServer.id}
                key={userFromServer.id}
              >
                {userFromServer.name}
              </option>
            ))}
          </select>

          {!hasUser && (
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
