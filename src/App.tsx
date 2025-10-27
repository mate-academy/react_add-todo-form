import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './components/types';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => {
      const user = usersFromServer.find(us => us.id === todo.userId);

      return { ...todo, user: user ?? undefined };
    }),
  );

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);

  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleError(title.trim() === '');
    setIsUserError(userId === 0);

    if (!title.trim() || userId === 0) {
      return;
    }

    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const selectedUser = usersFromServer.find(user => user.id === userId);

    if (!selectedUser) {
      setIsUserError(true);

      return;
    }

    const newTodo = {
      id: newId,
      title: title.trim(),
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos(current => [...current, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(
      /[^a-zA-Z0-9а-яА-ЯёЁіІїЇєЄґҐ\s]/g,
      '',
    );

    setTitle(newValue);
    setIsTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} data-cy="form">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={handleTitleChange}
          />
          {isTitleError && (
            <span className="error" data-cy="titleError">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserError && (
            <span className="error" data-cy="userError">
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
