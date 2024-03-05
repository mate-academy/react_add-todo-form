import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todos } from './types/Todos';
import { getMaxNumber } from './api/utills/getMaxNumber';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(person => person.id === todo.userId) || null,
}));

const initialTodosState = {
  title: '',
  userId: 0,
};

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [todosCurrent, setTodosCurrent] = useState(initialTodosState);
  const [touchedTitle, setTouchedTitle] = useState(false);
  const [touchedUser, setTouchedUser] = useState(false);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const cleanedValue = value.replace(/[^a-zA-Z0-9\u0400-\u04FF\s]/g, '');

    setTodosCurrent(prev => ({ ...prev, [name]: cleanedValue }));
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setTodosCurrent(prev => ({ ...prev, [name]: value }));
  };

  const isValidForm = !todosCurrent.title.trim() || !todosCurrent.userId;
  const hasTouchedTitle = touchedTitle && !todosCurrent.title.trim();
  const hasTouchedUser = touchedUser && !todosCurrent.userId;

  const reset = () => {
    setTodosCurrent(initialTodosState);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (isValidForm) {
      setTouchedTitle(true);
      setTouchedUser(true);

      return;
    }

    setTouchedTitle(false);
    setTouchedUser(false);

    const newPost: Todos = {
      id: getMaxNumber(todos),
      title: todosCurrent.title,
      completed: false,
      userId: todosCurrent.userId,
      user:
        usersFromServer.find(person => person.id === +todosCurrent.userId) ||
        null,
    };

    setTodos(prevValue => [...prevValue, newPost]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="titleLabel">Title: </label>
          <input
            value={todosCurrent.title}
            name="title"
            onChange={handleChangeTitle}
            id="titleLabel"
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            onBlur={() => setTouchedTitle(true)}
          />
          {hasTouchedTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userLabel">User: </label>
          <select
            id="titleLabel"
            name="userId"
            data-cy="userSelect"
            value={todosCurrent.userId}
            onChange={handleUserChange}
            onBlur={() => setTouchedUser(true)}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasTouchedUser && (
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
