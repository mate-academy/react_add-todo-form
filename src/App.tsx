import React, { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './type/todo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getNewTodoId(allTodos: Todo[]) {
  const todoId = Math.max(
    ...allTodos.map(todo => todo.id),
  );

  return todoId + 1;
}

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleReset = () => {
    setTitle('');
    setHasTitleError(false);

    setUserId(0);
    setUserIdError(false);
  };

  const addNewTodo = (newTodo: Todo) => {
    setTodos(prevTodo => [...prevTodo, newTodo]);
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo = ({
      id: getNewTodoId(todos),
      user: getUserById(userId),
      userId,
      title,
      completed: false,
    });

    addNewTodo(newTodo);
    handleReset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleAdd}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserIdChange}
          >
            <option key="0" value="0" disabled>Choose a user</option>
            {usersFromServer.map((userFromServer) => (
              <option
                key={userFromServer.id}
                value={userFromServer.id}
              >
                {userFromServer.name}
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
      <TodoList todos={todos} />
    </div>
  );
};
