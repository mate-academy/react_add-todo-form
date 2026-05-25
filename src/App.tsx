import './App.scss';
import React from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './Types/todo';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const App: React.FC = () => {
  const todos: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [titleError, setTitleError] = useState<string>('');
  const [userError, setUserError] = useState<string>('');

  function getmaxId(todolist: Todo[]) {
    return todolist.reduce((maxId, todo) => Math.max(maxId, todo.id), 0);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const isTitleEmpty = title.trim() === '';
    const isUserNotSelected = userId === 0;

    if (isTitleEmpty) {
      setTitleError('Please enter a title');
    }

    if (isUserNotSelected) {
      setUserError('Please choose a user');
    }

    if (isTitleEmpty || isUserNotSelected) {
      return;
    }

    setTitleError('');
    setUserError('');
    const newTodo: Todo = {
      id: getmaxId(visibleTodos) + 1,
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setVisibleTodos([...visibleTodos, newTodo]);
    setTitle('');
    setUserId(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              setTitleError('');
            }}
            placeholder="Title"
          />
          <span className="error">{titleError}</span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={e => {
              setUserId(Number(e.target.value));
              setUserError('');
            }}
            required
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

          <span className="error">{userError}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};