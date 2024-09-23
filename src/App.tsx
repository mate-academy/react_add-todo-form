import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [todos, setTodos] = useState(todosWithUser);
  const [userSelect, setUserSelect] = useState('0');
  const [todoTitle, setTodoTitle] = useState('');
  const [errorUserSelect, setErrorUserSelect] = useState(false);
  const [errorTodoTitle, setErrorTodoTitle] = useState(false);

  const getNextId = (actualTodos: Todo[]): number => {
    const maxId = actualTodos.reduce(
      (max, todo) => (todo.id > max ? todo.id : max),
      0,
    );

    return maxId + 1;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let hasError = false;

    if (userSelect === '0') {
      setErrorUserSelect(() => true);
      hasError = true;
    }

    if (todoTitle === '') {
      setErrorTodoTitle(true);
      hasError = true;
    }

    if (hasError) {
      return;
    }

    const newTodo = {
      id: getNextId(todos),
      title: todoTitle,
      userId: Number(userSelect),
      completed: false,
      user: getUser(Number(userSelect)),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setUserSelect('0');
    setTodoTitle('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const filteredValue = value.replace(/[^a-zA-Z0-9 ]/g, '');

    setTodoTitle(filteredValue);
    setErrorTodoTitle(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={todoTitle}
            onChange={handleTitleChange}
          />
          {errorTodoTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelect}
            onChange={event => {
              setUserSelect(event.target.value);
              setErrorUserSelect(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={`${user.id}`}>
                {user.name}
              </option>
            ))}
          </select>

          {errorUserSelect && (
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
