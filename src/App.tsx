import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types';
import { ChangeEvent, FormEvent, useState } from 'react';

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);
  const [name, setName] = useState('');
  const [user, setUser] = useState<number>(0);
  const [error, setError] = useState(false);

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    setUser(+value);
  };

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setName(value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setError(false);

    if (!name || !user) {
      setError(true);

      return;
    }

    // Calculate max id
    const maxId = Math.max(...todos.map(todo => todo.id));
    const newTodoId = maxId + 1;

    setTodos(prevState => [
      ...prevState,
      {
        id: newTodoId, // Assign new id
        title: name,
        completed: false,
        userId: user,
        user: usersFromServer.find(u => u.id === user),
      },
    ]);

    setName('');
    setUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="title"
            value={name}
            onChange={handleName}
          />
          {error && !name && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select data-cy="userSelect" value={user} onChange={handleSelect}>
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(u => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>

          {error && !user && (
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
