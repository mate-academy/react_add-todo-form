import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoMerged } from './types/TodoMerged';

function findUserById(userId: number) {
  return usersFromServer.find((user: User) => user.id === userId);
}

const todosMerged = todosFromServer.map((todo: Todo): TodoMerged => {
  return { ...todo, user: findUserById(todo.userId) };
});

export const App = () => {
  const [todos, setTodos] = useState(todosMerged);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasSelectError, setHasSelectError] = useState(false);
  const [inputTitle, setInputTitle] = useState('');
  const [hasInputError, setHasInputError] = useState(false);

  function addTodo(title: string, userId: number) {
    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;
    const newTodo: TodoMerged = {
      id: maxId + 1,
      title: title,
      completed: false,
      userId: userId,
      user: findUserById(userId),
    };

    setTodos((oldTodos: TodoMerged[]) => {
      return [...oldTodos, newTodo];
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setHasInputError(!inputTitle);
    setHasSelectError(!selectedUserId);

    if (!selectedUserId || !inputTitle) {
      return;
    }

    addTodo(inputTitle, selectedUserId);
    setSelectedUserId(0);
    setInputTitle('');
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={inputTitle}
            onChange={event => {
              setHasInputError(false);
              setInputTitle(event.target.value);
            }}
          />
          {hasInputError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>

          <select
            data-cy="userSelect"
            id="userSelect"
            value={selectedUserId}
            onChange={event => {
              setHasSelectError(false);
              setSelectedUserId(Number(event.target.value));
            }}
          >
            <option value={0}>Choose a user</option>
            {usersFromServer.map((user: User) => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {hasSelectError && (
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
