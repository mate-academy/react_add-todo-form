import React, { useState, useMemo } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import './App.scss';

export const App = () => {
  function getUserId(userId: number): User | null {
    const foundUser = usersFromServer.find(user => user.id === userId);

    return foundUser || null;
  }

  const getTodos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserId(todo.userId),
  }));

  function filterInputValue(value: string): string {
    return value.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');
  }

  const [todos, setTodos] = useState(getTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isErrorUser, setIsErrorUser] = useState(false);
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const maxId = useMemo(() => {
    return todos.length > 0
      ? Math.max(...todos.map(todo => todo.id)) + 1
      : 1;
  }, [todos]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle) {
      setIsErrorTitle(true);
    }

    if (!selectedUserId) {
      setIsErrorUser(true);
    }

    if (selectedUserId !== null && todoTitle) {
      const newTodo: Todo = {
        id: maxId,
        title: todoTitle,
        userId: selectedUserId,
        completed: false,
        user: getUserId(selectedUserId),
      };

      setTodos(prevTodos => [...prevTodos, newTodo]);
      setTodoTitle('');
      setSelectedUserId(null);
      setIsErrorUser(false);
      setIsErrorTitle(false);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    if (name === 'title') {
      const filteredValue = filterInputValue(value);

      setTodoTitle(filteredValue);
      setIsErrorTitle(false);
    }

    if (name === 'user') {
      setSelectedUserId(value !== '0' ? Number(value) : null);
      setIsErrorUser(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          Title:
          <input
            type="text"
            name="title"
            value={todoTitle}
            onChange={handleChange}
            data-cy="titleInput"
            placeholder="Enter a title"
            className="input-title"
          />
          {isErrorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:
          <select
            name="user"
            value={selectedUserId !== null ? selectedUserId : '0'}
            onChange={handleChange}
            data-cy="userSelect"
            className="user-select"
          >
            <option
              disabled
              value="0"
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isErrorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
