import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { NewTodo } from './types/Todo';

export const App = () => {
  const [selectValue, setSelectValue] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');
  const [todos, setTodos] = useState<NewTodo[]>([]);

  useEffect(() => {
    const todosWithUsers = todosFromServer.map(todo => {
      return {
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      };
    });
    setTodos(todosWithUsers);
  }, []);

  const submit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTodos(prevTodos => {
      return [
        ...prevTodos,
        {
          id: Math.max(...todos.map(todo => todo.id)) + 1,
          title: inputValue,
          completed: false,
          userId: selectValue,
          user: usersFromServer.find(user => user.id === selectValue),
        },
      ];
    });

    setInputValue('');
    setSelectValue(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={submit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
          />
          <span className="error">Please enter a title</span>
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectValue}
            onChange={e => setSelectValue(+e.target.value)}
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

          <span className="error">Please choose a user</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
