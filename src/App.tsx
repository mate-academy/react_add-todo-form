import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import type { User, Todo } from './api/types';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer as Todo[]);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState('');
  const [errors, setErrors] = useState({ title: false, user: false });

  const users: User[] = usersFromServer as User[];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      title: title.trim() === '',
      user: selectedUserId === '',
    };

    setErrors(newErrors);

    if (newErrors.title || newErrors.user) {
      return;
    }

    const user = users.find(userItem => userItem.id === Number(selectedUserId));

    if (!user) {
      return;
    }

    const newId = todos.length
      ? Math.max(...todos.map(todoItem => todoItem.id)) + 1
      : 1;

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      completed: false,
      userId: user.id,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUserId('');
    setErrors({ title: false, user: false });
  };

  return (
    <div className="App" data-cy="app">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} data-cy="todoForm">
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              if (errors.title) {
                setErrors(prev => ({ ...prev, title: false }));
              }
            }}
            placeholder="Enter todo title"
            aria-invalid={errors.title}
          />
          {errors.title && (
            <span className="error" data-cy="titleError" role="alert">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(event.target.value);
              if (errors.user) {
                setErrors(prev => ({ ...prev, user: false }));
              }
            }}
            aria-invalid={errors.user}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {errors.user && (
            <span className="error" data-cy="userError" role="alert">
              Please choose a user
            </span>
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
