import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoWithUser } from './types/TodoWithUser';
import { TodoList } from './components/TodoList';
import { getNewTodoId } from './components/utils/getNewTodoId';
import { getUserById } from './components/utils/getUserById';
import './App.scss';

export const initialTodos: TodoWithUser[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(initialTodos);
  const [errors, setErrors] = useState({ title: false, user: false });

  const handleEnterTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value.trim());
    setErrors(prevErrors => ({ ...prevErrors, title: false }));
  };

  const handleSelectUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setErrors(prevErrors => ({ ...prevErrors, user: false }));
  };

  const validateForm = () => {
    const newErrors = { title: !title, user: userId === 0 };

    setErrors(newErrors);

    return !newErrors.title && !newErrors.user;
  };

  const handleTodoSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleTodoSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleEnterTitle}
            placeholder="Enter a title"
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={handleSelectUser}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(person => (
              <option key={person.id} value={person.id}>
                {person.name}
              </option>
            ))}
          </select>

          {errors.user && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
