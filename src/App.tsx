import React, { useEffect, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number) {
  const foundUser = usersFromServer.find(user => userId === user.id);

  return foundUser || null;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);

  function addTodo(newTitle: string, newUserId: number) {
    const newTodoId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      userId: newUserId,
      id: newTodoId,
      title: newTitle,
      completed: false,
      user: getUser(newUserId),
    };

    setTodos(current => [...current, newTodo]);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo(title, userId);
    setTitle('');
    setUserId(0);
  }

  useEffect(() => {
    const initialTodos: Todo[] = todosFromServer.map(todo => (
      {
        ...todo,
        user: getUser(todo.userId),
      }
    ));

    setTodos(initialTodos);
  }, []);

  return (
    <div className="App">
      <h1>
        Add todo form
      </h1>
      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
            />
          </label>

          {hasTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={(event) => {
                setUserId(+event.target.value);
                setUserError(false);
              }}
            >
              <option value="0">
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {hasUserError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>
        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
