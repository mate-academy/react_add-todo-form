import React, { ChangeEvent } from 'react';
import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { getUserById } from './services/user';
import { TodoList } from './components/TodoList';

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todoItems: Todo[]) {
  const maxId = Math.max(...todoItems.map(todo => todo.id));

  return maxId + 1;
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [todoItems, setTodoItems] = useState(todos);

  const addTodo = (todo: Todo) => {
    const newTodo = {
      ...todo,
      id: getNewTodoId(todoItems),
    };

    setTodoItems(currentTodos => [...currentTodos, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleSelectCahnge = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasSelectError(false);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasSelectError(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo({
      title,
      completed: false,
      userId: userId,
      id: getNewTodoId(todoItems),
      user: getUserById(userId),
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        key={getNewTodoId(todoItems)}
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="post-title">Title:&nbsp;&nbsp;</label>
          <input
            id="post-title"
            type="text"
            value={title}
            placeholder="Enter a title"
            data-cy="titleInput"
            onChange={handleTitleChange}
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-id">User:</label>
          <select
            id="user-id"
            data-cy="userSelect"
            required
            value={userId}
            onChange={handleSelectCahnge}
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
          {hasSelectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>
        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todoItems} />
    </div>
  );
};
