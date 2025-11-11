import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getRandomDigits() {
  return Math.random().toFixed(16).slice(2);
}

export const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [idUser, setIdUser] = useState(0);
  const [wasSubmitted, setWasSubmitted] = useState(false);
  const [inputId] = useState(() => `title-${getRandomDigits()}`);
  const [selectId] = useState(() => `user-${getRandomDigits()}`);

  function getNextId(todoList: Todo[]) {
    return Math.max(0, ...todoList.map(todo => todo.id)) + 1;
  }

  const hasError = !title.trim() || idUser === 0;
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const resetForm = () => {
    setTitle('');
    setIdUser(0);
    setWasSubmitted(false);
  };

  const buildNewTodo = () => ({
    id: getNextId(todos),
    title: title.trim(),
    completed: false,
    userId: idUser,
    user: getUserById(idUser),
  });

  const onAdd = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setWasSubmitted(true);

    if (!hasError) {
      const todoToAdd = buildNewTodo();

      onAdd(todoToAdd);
      resetForm();

      return;
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor={inputId}>
            Title:{' '}
          </label>
          <input
            type="text"
            placeholder="Enter a title"
            id={inputId}
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {wasSubmitted && !title.trim() && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label className="label" htmlFor={selectId}>
            User:{' '}
          </label>
          <select
            id={selectId}
            data-cy="userSelect"
            value={idUser}
            onChange={event => setIdUser(+event.target.value)}
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

          {wasSubmitted && idUser === 0 && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
