import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(
    ...todos.map(todo => todo.id),
  );

  return maxId + 1;
}

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [count, setCount] = useState(getNewTodoId(initialTodos));
  const [todosList, setTodosList] = useState<Todo[]>(initialTodos);
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const onAddTodo = (newTodo: Todo) => {
    setTodosList(currentTodos => [...currentTodos, newTodo]);
  };

  const resetForm = () => {
    setCount(count + 1);
    setTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setSelectError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    onAddTodo({
      user: getUserById(selectedUserId),
      id: count,
      title,
      completed: false,
      userId: selectedUserId,
    });

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        key={count}
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setTitleError(false);
              }}
            />
          </label>
          {titleError && (
            <span className="error">Please enter a title</span>

          )}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              data-cy="userSelect"
              defaultValue={0}
              value={selectedUserId}
              onChange={(event) => {
                setSelectedUserId(+event.target.value);
                setSelectError(false);
              }}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {selectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
