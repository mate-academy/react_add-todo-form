import './App.scss';

import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

function getUser(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

const todos: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUser(todo.userId),
  };
});

export const App: React.FC = () => {
  const [initialTodo, setInitialTodo] = useState<Todo[]>(todos);

  const [userId, setUserId] = useState(0);
  const [selectErrorMessage, setSelectErrorMessage] = useState(false);

  const [title, setTitle] = useState('');
  const [titleErrorMessage, setTitleErrorMessage] = useState(false);

  const addNewTodo = ({ id, ...data }: Todo) => {
    const newTodo = {
      id: getNewTodoId(initialTodo),
      ...data,
    };

    setInitialTodo((currentTodo) => [...currentTodo, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleErrorMessage(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setSelectErrorMessage(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
    setTitleErrorMessage(false);
    setSelectErrorMessage(false);
  };

  const handleSubmitForm = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleErrorMessage(!title);
    setSelectErrorMessage(!userId);

    if (!title || !userId) {
      return;
    }

    addNewTodo({
      id: 0,
      title,
      userId,
      completed: false,
      user: getUser(userId),
    });

    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmitForm}
      >
        <div className="field">
          <input
            type="text"
            value={title}
            placeholder="Enter a title"
            data-cy="titleInput"
            onChange={handleTitleChange}
          />

          {titleErrorMessage && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {selectErrorMessage && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={initialTodo} />
      </section>
    </div>
  );
};
