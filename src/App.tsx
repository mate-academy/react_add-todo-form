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
    ...todos.map(({ id }) => id),
  );

  return maxId + 1;
}

const symbolsException = /[^a-zA-Zа-яА-Я0-9\s]/g;

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [todosList, setTodosList] = useState<Todo[]>(initialTodos);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isSelectError, setIsSelectError] = useState(false);

  const addNewTodo = (newTodo: Todo) => {
    setTodosList(currentTodos => [...currentTodos, newTodo]);
  };

  const resetForm = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleError(!title);
    setIsSelectError(!selectedUserId);

    if (!title || !selectedUserId) {
      return;
    }

    addNewTodo({
      user: getUserById(selectedUserId),
      id: getNewTodoId(initialTodos),
      title,
      completed: false,
      userId: selectedUserId,
    });

    resetForm();
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(symbolsException, ''));
    setIsTitleError(false);
  };

  const handleSelectedUserIdChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUserId(+event.target.value);
    setIsSelectError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        key={getNewTodoId(initialTodos)}
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
              onChange={handleTitleChange}
            />
          </label>
          {isTitleError && (
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
              onChange={handleSelectedUserIdChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
          </label>

          {isSelectError && (
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
