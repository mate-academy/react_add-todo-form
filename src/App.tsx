import { useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { SaveTodoDTO } from './interfaces/saveTodoDto';
import { SaveTodoError } from './interfaces/saveTodoError';
import { Todo } from './interfaces/todo';
import { TodoUser } from './interfaces/todoUser';
import { User } from './interfaces/user';

const getUserById = (userArr: User[], userId: number): User => {
  return userArr.find(user => user.id === userId) as User;
};

const getVisibleTodos = (todosArr: Todo[]): TodoUser[] => {
  return [...todosArr].map(todo => ({
    ...todo,
    user: getUserById(usersFromServer, todo.userId),
  }));
};

const defaultSaveTodo: SaveTodoDTO = {
  title: '',
  userId: 0,
};

const defaultSaveTodoError: SaveTodoError = {
  title: '',
  user: '',
};

const getNextId = (todoArr: Todo[]): number => {
  return Math.max(...todoArr.map(todo => todo.id)) + 1;
};

const validateTitle = (title: string): string => {
  if (!title || !title.trim()) {
    return 'Please enter a title';
  } else {
    if (!/^[a-zA-Z0-9А-ЩЬЮЯҐЄІЇа-щьюяґєії ]*$/g.test(title)) {
      return 'Only EN, UA letters, numbers and spaces allowed';
    }
  }

  return '';
};

const validateUser = (userId: number): string => {
  return userId === 0 ? 'Please choose a user' : '';
};

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [saveTodo, setSaveTodo] = useState(defaultSaveTodo);

  const [saveTodoError, setSaveTodoError] = useState(defaultSaveTodoError);

  const visibleTodos = getVisibleTodos(todos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateTitle(saveTodo.title) && !validateUser(saveTodo.userId)) {
      setTodos([
        ...todos,
        { id: getNextId(todos), completed: false, ...saveTodo },
      ]);
      setSaveTodo(defaultSaveTodo);
    } else {
      setSaveTodoError({
        title: validateTitle(saveTodo.title),
        user: validateUser(saveTodo.userId),
      });
    }
  };

  const setSaveTodoErrorFn = (
    field: keyof SaveTodoError,
    value: string,
  ): void => {
    setSaveTodoError(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleTitleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ): void => {
    if (saveTodoError.title) {
      setSaveTodoErrorFn('title', '');
    }

    return setSaveTodo(prev => {
      return { ...prev, title: event.target.value };
    });
  };

  const handleUserOnChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ): void => {
    if (saveTodoError.user) {
      setSaveTodoErrorFn('user', '');
    }

    setSaveTodo(prev => {
      return { ...prev, userId: +event.target.value };
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={saveTodo.title}
            placeholder="Kangaroo"
            onChange={handleTitleOnChange}
          />
          {saveTodoError.title && (
            <span className="error">{saveTodoError.title}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userId">User:</label>
          <select
            id="userId"
            data-cy="userSelect"
            value={saveTodo.userId}
            onChange={handleUserOnChange}
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

          {saveTodoError.user && (
            <span className="error">{saveTodoError.user}</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
