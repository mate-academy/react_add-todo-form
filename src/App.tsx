import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

export const App = () => {
  const initialTodos: Todo[] = todosFromServer.map(todo => {
    const user = usersFromServer.find(u => u.id === todo.userId);

    if (!user) {
      throw new Error(`User with id ${todo.userId} not found`);
    }

    return {
      ...todo,
      user,
    };
  });

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [errors, setErrors] = useState({ title: false, userId: false });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedTitle = title.trim().replace(/[^\wa-яА-ЯіІїЇєЄёЁ\s]/gi, '');

    const hasTitleError = trimmedTitle === '';
    const hasUserError = userId === '';

    if (hasTitleError || hasUserError) {
      setErrors({
        title: hasTitleError,
        userId: hasUserError,
      });

      return;
    }

    const newId = todos.length
      ? Math.max(...todos.map(todo => todo.id)) + 1
      : 1;
    const user = usersFromServer.find(u => u.id === +userId);

    if (!user) {
      setErrors(prev => ({ ...prev, userId: true }));

      return;
    }

    const newTodo = {
      id: newId,
      title: trimmedTitle,
      userId: +userId,
      completed: false,
      user,
    };

    setTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId('');
    setErrors({ title: false, userId: false });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setErrors(prev => ({ ...prev, title: false }));
            }}
          />
          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(e.target.value);
              setErrors(prev => ({ ...prev, userId: false }));
            }}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.userId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
