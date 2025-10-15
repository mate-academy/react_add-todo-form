import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)!;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todoList, setTodoList] = useState(todos);

  const [showTitleError, setShowTitleError] = useState(false);
  const [showUserIdError, setShowUserIdError] = useState(false);

  const handleTitleChange = (e: string) => {
    setTitle(e);
    setShowTitleError(false);
  };

  const handleUserChange = (e: number) => {
    setUserId(e);
    setShowUserIdError(false);
  };

  const addButton = (e: React.FormEvent) => {
    e.preventDefault();

    setShowTitleError(!title);
    setShowUserIdError(!userId);

    if (userId === 0 || title === '') {
      return;
    }

    const newTodo = {
      id: Math.max(...todoList.map(todo => todo.id)) + 1,
      title: title,
      completed: false,
      userId: userId,
      user: getUserById(userId),
    };

    setTodoList(currentTodos => [...currentTodos, newTodo]);
    setTitle('');
    setUserId(0);
    setShowTitleError(false);
    setShowUserIdError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addButton}>
        <div className="field">
          <label htmlFor="title-input">Title: </label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={e => handleTitleChange(e.target.value)}
          />
          {showTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="select-input">User: </label>
          <select
            id="select-input"
            data-cy="userSelect"
            defaultValue="0"
            value={userId}
            onChange={e => handleUserChange(+e.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
          {showUserIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
