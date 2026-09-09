import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { NewTodo, Todo } from './types/todo';

import { TodoList } from './components/TodoList';

const DEFAULT_NEW_TODO: NewTodo = {
  title: '',
  completed: false,
  userId: 0,
  user: null,
};

const DEFAULT_NEW_TODO_ERROR_MESSAGES = {
  title: '',
  userId: '',
};

const TITLE_PATTERN = /[^a-zA-Zа-яА-ЯіїєґІЇЄҐ0-9 ]/g;

const getUser = (userId: number) =>
  usersFromServer.find(user => user.id === userId);

const defaultTodos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUser(todo.userId) || null,
  };
});

const sanitizeTitle = (value: string) => {
  return value.replace(TITLE_PATTERN, '');
};

export const App = () => {
  const [todos, setTodos] = useState(defaultTodos);

  const [newTodo, setNewTodo] = useState(DEFAULT_NEW_TODO);
  const [newTodoErrorMessages, setNewTodoErrorMessages] = useState(
    DEFAULT_NEW_TODO_ERROR_MESSAGES,
  );

  const handleTitleChange = (value: string) => {
    setNewTodo(prev => ({
      ...prev,
      title: value,
    }));

    setNewTodoErrorMessages(prev => ({
      ...prev,
      title: '',
    }));
  };

  const handleUserChange = (userId: number) => {
    setNewTodo(prev => ({
      ...prev,
      userId,
      user: getUser(userId) || null,
    }));

    setNewTodoErrorMessages(prev => ({
      ...prev,
      userId: '',
    }));
  };

  const validateTitle = (value: string) => {
    if (value === '') {
      return 'Please enter a title';
    }

    return '';
  };

  const validateUserId = (value: number) => {
    if (value === 0) {
      return 'Please choose a user';
    }

    return '';
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newTodoErrorMessagesToAdd = {
      ...newTodoErrorMessages,
      title: validateTitle(newTodo.title.trim()),
      userId: validateUserId(newTodo.userId),
    };

    setNewTodoErrorMessages(newTodoErrorMessagesToAdd);

    for (const newTodoErrorMessage of Object.entries(
      newTodoErrorMessagesToAdd,
    )) {
      if (newTodoErrorMessage[1] !== '') {
        return;
      }
    }

    const nextTodoId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const todoToAdd: Todo = {
      ...newTodo,
      title: newTodo.title.trim(),
      id: nextTodoId,
    };

    setTodos(prev => [...prev, todoToAdd]);

    setNewTodo(DEFAULT_NEW_TODO);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            id="titleInput"
            value={newTodo.title}
            placeholder="Enter a title"
            onChange={event =>
              handleTitleChange(sanitizeTitle(event.target.value))
            }
          />
          {newTodoErrorMessages.title !== '' && (
            <span className="error">{newTodoErrorMessages.title}</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            name="userId"
            data-cy="userSelect"
            id="userSelect"
            value={newTodo.userId}
            onChange={event => handleUserChange(+event.target.value)}
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

          {newTodoErrorMessages.userId !== '' && (
            <span className="error">{newTodoErrorMessages.userId}</span>
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
