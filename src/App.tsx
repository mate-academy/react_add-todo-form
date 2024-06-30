import React, { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { TodoItem } from './types/TodoItems';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find((user: User) => user.id === userId) || null;
}

function getTodoId(todos: TodoItem[]): number {
  if (todos.length === 0) {
    return 1;
  }

  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [todo, setTodo] = useState<TodoItem[]>(
    todosFromServer.map(todos => ({
      ...todos,
      user: getUserById(todos.userId),
    })),
  );

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const addToDo = (newToDo: TodoItem) => {
    setTodo(prev => [...prev, newToDo]);
  };

  function reset() {
    setTitle('');
    setHasTitleError(false);
    setUserId(0);
    setHasUserIdError(false);
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const Titletrimm = title.trim();

    if (!Titletrimm || !userId) {
      setHasTitleError(!Titletrimm);
      setHasUserIdError(!userId);

      return;
    }

    const newToDo: TodoItem = {
      id: getTodoId(todo),
      title: title,
      completed: false,
      userId,
      user: getUserById(userId),
    };

    addToDo(newToDo);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            name="user"
            data-cy="userSelect"
            required
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setHasUserIdError(false);
            }}
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
          {hasUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todo} />
    </div>
  );
};
