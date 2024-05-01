import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    title: '',
    userId: 0,
    completed: false,
  });

  const [hasFieldsError, setHasFieldsError] = useState({
    title: false,
    userId: false,
  });

  const { title, userId } = newTodo;

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newTitle = e.target.value;
    const pattern = /^[A-Za-z0-9\sА-ЩЬЮЯҐЄІЇа-щьюяґєії]*$/;

    if (!pattern.test(newTitle)) {
      newTitle = newTitle
        .split('')
        .filter(char => pattern.test(char))
        .join('');
    }

    setNewTodo({
      ...newTodo,
      title: newTitle,
    });

    setHasFieldsError({
      ...hasFieldsError,
      title: false,
    });
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewTodo({
      ...newTodo,
      userId: +e.target.value,
    });

    setHasFieldsError({
      ...hasFieldsError,
      userId: false,
    });
  };

  const getNewTodoId = () => {
    const maxId = Math.max(...todos.map(({ id }) => id));

    return maxId + 1;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!(title && userId)) {
      setHasFieldsError({
        title: !title,
        userId: !userId,
      });

      return;
    }

    setTodos([
      ...todos,
      {
        ...newTodo,
        id: getNewTodoId(),
      },
    ]);

    setNewTodo({
      id: 0,
      title: '',
      userId: 0,
      completed: false,
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="post-title">Title: </label>

          <input
            name="title"
            id="post-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />

          {hasFieldsError.title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="post-userId">User: </label>

          <select
            name="userId"
            id="post-userId"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
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

          {hasFieldsError.userId && (
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
