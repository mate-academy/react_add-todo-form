import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import cn from 'classnames';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: { id: number; name: string; email: string } | null;
}

const preparedTodos = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId) || null,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | ''>('');
  const [errors, setErrors] = useState({ titleError: '', userError: '' });

  const addTodo = () => {
    const newErrors: { titleError: string; userError: string } = {
      titleError: '',
      userError: '',
    };

    if (!title.trim()) {
      newErrors.titleError = 'Please enter a title';
    }

    if (!userId) {
      newErrors.userError = 'Please choose a user';
    }

    if (newErrors.titleError || newErrors.userError) {
      setErrors(newErrors);

      return;
    }

    const foundUser = usersFromServer.find(user => user.id === Number(userId));

    const newTodo: Todo = {
      id: todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
      title: title.trim(),
      userId: Number(userId),
      completed: false,
      user: foundUser
        ? { id: foundUser.id, name: foundUser.name, email: foundUser.email }
        : null,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setUserId('');
    setErrors({ titleError: '', userError: '' });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          event.preventDefault();
          addTodo();
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter todo title"
            onChange={e => {
              setTitle(e.target.value);
              if (errors.titleError) {
                setErrors({ ...errors, titleError: '' });
              }
            }}
          />
          {errors.titleError && (
            <span className="error">{errors.titleError}</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={ev => {
              setUserId(ev.target.value ? Number(ev.target.value) : '');

              if (errors.userError) {
                setErrors({ ...errors, userError: '' });
              }
            }}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.userError && (
            <span className="error">{errors.userError}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map(todo => (
          <article
            data-id={todo.id}
            key={todo.id}
            className={cn('TodoInfo', {
              'TodoInfo--completed': todo.completed,
            })}
          >
            <h2 className="TodoInfo__title">{todo.title} </h2>
            {todo.user ? (
              <a className="UserInfo" href={`mailto:${todo.user.email}`}>
                {todo.user.name}
              </a>
            ) : (
              <span className="NoUser">Unknown User </span>
            )}
          </article>
        ))}
      </section>
    </div>
  );
};
