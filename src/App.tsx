import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todos } from './types/todos';
import { Users } from './types/users';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

const preperaTodo: Todos[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todos[]>(preperaTodo);

  const [title, setTitle] = useState<string>('');
  const [selectedUser, setSelectedUser] = useState<number>(0);
  const [titleHasError, setTitleHasError] = useState<boolean>(false);
  const [selectedHasError, setSelectedHasError] = useState<boolean>(false);

  const reset = () => {
    setTitle('');
    setSelectedUser(0);
    setTitleHasError(false);
    setSelectedHasError(false);
  };

  const addTodo = (newTodo: Todos) => {
    setTodos(current => [...current, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim() || !selectedUser) {
      setTitleHasError(!title);
      setSelectedHasError(!selectedUser);

      return;
    }

    addTodo({
      id: +Math.max(...todos.map(todo => todo.id), 0) + 1,
      title,
      completed: false,
      userId: selectedUser,
      user: getUserById(selectedUser) as Users,
    });

    reset();
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+event.target.value);
    setSelectedHasError(false);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleHasError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
        onReset={reset}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleChangeTitle}
          />

          {titleHasError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleChangeSelect}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectedHasError && (
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
