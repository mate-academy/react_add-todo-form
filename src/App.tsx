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
  const [userSelectId, setUserSelectId] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [errorUserSelectId, setErrorUserSelectId] = useState(false);
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

    if (userSelectId === 0) {
      setErrorUserSelectId(() => true);
    }

    if (todoTitle === '') {
      setErrorTodoTitle(true);
    }

    if (userSelectId === 0 || todoTitle === '') {
      return;
    }

    const newTodo = {
      id: getNextId(todos),
      title: todoTitle,
      userId: Number(userSelectId),
      completed: false,
      user: getUser(Number(userSelectId)),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setUserSelectId(0);
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
            value={userSelectId}
            onChange={event => {
              setUserSelectId(Number(event.target.value));
              setErrorUserSelectId(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => {
              const { id, name } = user;

              return (
                <option key={id} value={id}>
                  {name}
                </option>
              );
            })}
          </select>

          {errorUserSelectId && (
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
