import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import { User } from './types/User';

import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

const preparedTodos:Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [visibleTodos, setVisibleTodos] = useState(preparedTodos);
  const [touched, setTouched] = useState(false);
  const nextId = Math.max(...visibleTodos.map(todo => todo.id)) + 1;

  const hasErrors = {
    title: touched && !todoTitle,
    user: touched && !selectedUserId,
  };

  const newTodo:Todo = {
    id: nextId,
    title: todoTitle,
    completed: false,
    userId: selectedUserId,
    user: getUserById(selectedUserId),
  };

  const handleSelectChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /^[a-zA-Zа-яА-ЯёЁ0-9\s]*$/;
    const input = e.target.value;

    if (regex.test(input)) {
      setTodoTitle(input);
    }
  };

  const reset = () => {
    setSelectedUserId(0);
    setTodoTitle('');
    setTouched(false);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched(true);

    if (!todoTitle || !selectedUserId) {
      setTouched(true);

      return;
    }

    setVisibleTodos((todos) => [...todos, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleInputChange}
          />

          {hasErrors.title && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleSelectChange}
          >
            <option value="0" disabled>Choose a user</option>
            { usersFromServer.map((user) => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasErrors.user && (
            <span className="error">Please choose a user</span>
          )}

        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
