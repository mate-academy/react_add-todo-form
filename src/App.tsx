import { useState, FormEvent, ChangeEvent } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types';
import './App.scss';

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);
  const [nameId, setNameId] = useState('');
  const [user, setUser] = useState<number>(0);
  const [hasError, setHasError] = useState(false);

  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUser(+value);
  };

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setNameId(value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!nameId.trim() || !user) {
      setHasError(true);

      return;
    }

    setTodos(prevState => [
      ...prevState,
      {
        id: Math.max(...todosWithUser.map(todo => todo.id)) + 1,
        title: nameId.trim(),
        completed: false,
        userId: user,
        user: usersFromServer.find(u => u.id === user),
      },
    ]);

    setNameId('');
    setUser(0);
    setHasError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="name">
            Title:{' '}
            <input
              type="text"
              data-cy="titleInput"
              id="name"
              placeholder="Enter a title"
              value={nameId}
              onChange={handleName}
            />
            {hasError && !nameId.trim() && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label htmlFor="user">
            User:{' '}
            <select
              data-cy="userSelect"
              id="user"
              value={user}
              onChange={handleSelect}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
            {hasError && !user && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
