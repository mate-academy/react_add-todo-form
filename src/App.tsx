import './App.scss';
import { Todo } from './types/Todo';
import { User } from './types/User';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const visibleTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(visibleTodos);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoUser, setTodoUser] = useState('');
  const [hasTitleError, setTitleError] = useState(false);
  const [hasUserError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoUser(event.target.value);
    setUserError(false);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!todoTitle.trim());
    setUserError(!todoUser);

    if (!todoTitle.trim() || !todoUser) {
      return;
    }

    const user = getUserById(+todoUser);

    if (!user) {
      return;
    }

    addTodo({
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: todoTitle,
      completed: false,
      userId: +todoUser,
      user: user,
    });

    setTodoTitle('');
    setTodoUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="textId">
            Title:
            <input
              id="textId"
              type="text"
              data-cy="titleInput"
              placeholder="Please enter a title"
              value={todoTitle}
              onChange={handleTitleChange}
            />
            {hasTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label htmlFor="userId">
            User:
            <select
              data-cy="userSelect"
              id="userId"
              value={todoUser}
              onChange={handleUserChange}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {hasUserError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
