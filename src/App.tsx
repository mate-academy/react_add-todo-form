import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { User } from './User';
import { Todo } from './ToDO';

export const App = () => {
  const [typedTitle, setTypedTitle] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [users] = useState<User[]>(usersFromServer);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [errors, setErrors] = useState({
    titleError: false,
    userError: false,
  });

  const validateForm = (): boolean => {
    const newErrors = {
      titleError: !typedTitle.trim(),
      userError: !user,
    };

    setErrors(newErrors);

    return !newErrors.titleError && !newErrors.userError;
  };

  const createTodo = (): Todo => {
    return {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      id: createIdForToDo(),
      title: typedTitle,
      userId: user ? user.id : 0,
      completed: false,
    };
  };

  const addTodo = () => {
    if (!validateForm()) {
      return;
    }

    const newTodo = createTodo();

    setTodos(prevState => [...prevState, newTodo]);

    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    reset();
  };

  const reset = () => {
    setTypedTitle('');
    setUser(null);
    setErrors({
      titleError: false,
      userError: false,
    });
  };

  const createIdForToDo = (): number => {
    const max = todos.reduce((maxId, todo) => {
      return Math.max(maxId, todo.id);
    }, -Infinity);

    return max + 1;
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTypedTitle(e.target.value);
    setErrors(prevErrors => ({
      ...prevErrors,
      titleError: false,
    }));
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = Number(e.target.value);
    const newUser = usersFromServer.find(u => u.id === selectedUserId) || null;

    setUser(newUser);

    setErrors(prevErrors => ({
      ...prevErrors,
      userError: false,
    }));
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={e => {
          e.preventDefault();
          addTodo();
        }}
      >
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            name="title"
            type="text"
            data-cy="titleInput"
            value={typedTitle}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />
          {errors.titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>
        <div className="field">
          <label htmlFor="userSeletion">User:</label>
          <select
            name="userSeletion"
            data-cy="userSelect"
            onChange={handleUserChange}
            value={user ? user.id : 0}
          >
            <option value="0" disabled={!!user}>
              Choose a user
            </option>
            {/* eslint-disable-next-line @typescript-eslint/no-shadow */}
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errors.userError && (
            <span className="error">Please choose a user</span>
          )}
        </div>
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} users={users} />
    </div>
  );
};
