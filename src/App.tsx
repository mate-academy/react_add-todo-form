import { useState } from 'react';
import './App.scss';

import users from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: (users.find(user => user.id === todo.userId) || null),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [errors, setErrors] = useState({
    titleError: false,
    userError: false,
  });

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim().length) {
      setErrors((current) => ({
        ...current,
        titleError: true,
      }));
    }

    if (!userId) {
      setErrors((current) => ({
        ...current,
        userError: true,
      }));
    }

    if (!title.trim().length || !userId) {
      return;
    }

    const newTodo: Todo = {
      title,
      userId,
      completed,
      id: (Math.max(...todos.map(todo => todo.id)) + 1),
      user: users.find(user => user.id === userId) || null,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
    setCompleted(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={onSubmit}>
        <div className="field">
          <label htmlFor="titleInput">
            {'Title: '}
          </label>

          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={(event) => {
              setTitle(event.target.value);
              setErrors((current) => ({
                ...current,
                titleError: false,
              }));
            }}
          />

          {errors.titleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            {'User: '}
          </label>

          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setErrors((current) => ({
                ...current,
                userError: false,
              }));
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.userError
            && <span className="error">Please choose a user</span>}
        </div>

        <div className="field">
          <label htmlFor="completed">
            {'Completed? '}
          </label>

          <input
            id="completed"
            type="checkbox"
            name="completed"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
