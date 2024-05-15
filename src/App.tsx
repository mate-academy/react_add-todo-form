import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todos } from './types/Todos';

export function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getTodosId(todoId: Todos[]) {
  const maxTodoId = Math.max(...todoId.map(todo => todo.id));

  return maxTodoId + 1;
}

const initialTodos: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [hasTitleError, sethasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUsrIdError] = useState(false);

  const [todoList, setTodoList] = useState<Todos[]>(initialTodos);
  const newId = getTodosId(todoList);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    sethasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUsrIdError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setUsrIdError(!userId);

    if (!title.trim()) {
      sethasTitleError(true);
    }

    if (userId > 0 && title.trim() !== '') {
      sethasTitleError(false);
      setUsrIdError(false);
    } else {
      return;
    }

    setTodoList([
      ...todoList,
      {
        id: newId,
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      },
    ]);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              onSubmit={handleSubmit}
            />
          </label>
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
