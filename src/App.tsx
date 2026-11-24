import { useState, type FormEvent } from 'react';

import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';
import type { Todo } from './types';

const initialTodos: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(person => person.id === todo.userId);

  if (!user) {
    throw new Error(`User not found for TODO ${todo.id}`);
  }

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (value: string) => {
    setTitle(value);
    setTitleError(false);
  };

  const handleUserChange = (value: string) => {
    setUserId(value);
    setUserError(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedTitle = title.trim();

    const selectedUser = usersFromServer.find(
      user => user.id === Number(userId),
    );

    const hasTitleError = trimmedTitle.length === 0;
    const hasUserError = !selectedUser;

    setTitleError(hasTitleError);
    setUserError(hasUserError);

    if (hasTitleError || hasUserError || !selectedUser) {
      return;
    }

    const nextId = Math.max(0, ...todos.map(todo => todo.id)) + 1;

    const newTodo: Todo = {
      id: nextId,
      title: trimmedTitle,
      userId: selectedUser.id,
      completed: false,
      user: selectedUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setUserId('0');
    setTitleError(false);
    setUserError(false);
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
            onChange={event => handleTitleChange(event.target.value)}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="todo-user">User</label>

          <select
            id="todo-user"
            data-cy="userSelect"
            value={userId}
            onChange={event => handleUserChange(event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
