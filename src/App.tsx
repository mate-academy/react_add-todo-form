import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [isTitleError, setTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const setTodosWithUsers = (addTodos: Todo[], users: User[]): Todo[] => {
    return addTodos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId),
    }));
  };

  const [todos, setTodos] = useState(
    setTodosWithUsers(todosFromServer, usersFromServer),
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newTitle = event.target.value;

    newTitle = newTitle.replace(/[^a-zA-Zа-щА-ЩьЬюЮяЯіІїЇєЄґҐ0-9 ]+/g, '');

    setTitle(newTitle);

    if (newTitle) {
      setTitleError(false);
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newUserId = +event.target.value;

    setUserId(newUserId);

    if (newUserId !== 0) {
      setIsUserError(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTitle = title.trim();

    if (!newTitle) {
      setTitleError(true);
    }

    if (!userId) {
      setIsUserError(true);
    }

    if (!newTitle || !userId) {
      return;
    }

    if (newTitle && userId !== 0) {
      const maxId = Math.max(...todos.map(todo => todo.id));

      const newTodo: Todo = {
        id: maxId + 1,
        title: newTitle,
        completed: false,
        userId,
        user: usersFromServer.find(user => user.id === userId),
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);

      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            {'Title:  '}
          </label>
          <input
            name="title"
            value={title}
            id="title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            onChange={handleTitleChange}
          />

          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">
            {'User:  '}
          </label>

          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={handleUserIdChange}
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

          {isUserError && (
            <span className="error">Please choose a user</span>
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
