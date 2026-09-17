import { type FormEvent, useState } from 'react';
import './App.scss';
import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import type { Todo } from './components/TodoInfo';

const initialTodos = todosFromServer.flatMap<Todo>(todo => {
  const user = usersFromServer.find(
    userFromServer => userFromServer.id === todo.userId,
  );

  return user ? [{ ...todo, user }] : [];
});

export const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number | null>(null);
  const [errors, setErrors] = useState({
    title: false,
    user: false,
  });

  const handleTitleChange = (
    changeEvent: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(changeEvent.target.value);
    setErrors(currentErrors => ({
      ...currentErrors,
      title: false,
    }));
  };

  const handleUserChange = (
    changeEvent: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(Number(changeEvent.target.value) || null);
    setErrors(currentErrors => ({
      ...currentErrors,
      user: false,
    }));
  };

  const handleSubmit = (submitEvent: FormEvent<HTMLFormElement>) => {
    submitEvent.preventDefault();

    const selectedUser = usersFromServer.find(user => user.id === userId);
    const hasTitleError = title.trim() === '';
    const hasUserError = !selectedUser;

    if (hasTitleError || hasUserError) {
      setErrors({
        title: hasTitleError,
        user: hasUserError,
      });

      return;
    }

    const nextTodoId = Math.max(...todos.map(todo => todo.id)) + 1;

    setTodos([
      ...todos,
      {
        id: nextTodoId,
        title,
        userId: selectedUser.id,
        completed: false,
        user: selectedUser,
      },
    ]);
    setTitle('');
    setUserId(null);
    setErrors({
      title: false,
      user: false,
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="todo-title">Title</label>
          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {errors.title && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User</label>
          <select
            id="todo-user"
            data-cy="userSelect"
            value={userId ?? ''}
            onChange={handleUserChange}
          >
            <option value="">Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
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
