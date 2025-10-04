import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { UserI } from './types/User';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

export const App = () => {
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState([...todosFromServer]);
  const [selectValue, setSelectValue] = useState(0);
  const [hasInputErr, setHasInputErr] = useState(false);
  const [hasSelectErr, setHasSelectErr] = useState(false);
  const handleInput = (valueToSet: string) => {
    setInputValue(valueToSet);
    if (!valueToSet) {
      setHasInputErr(true);
    } else {
      setHasInputErr(false);
    }
  };

  const handleSelect = (value: number) => {
    setSelectValue(value);

    if (!selectValue) {
      setHasSelectErr(true);
    } else {
      setHasSelectErr(false);
    }
  };

  function createTodo(
    todoTitle: string,
    todosArg: Todo[],
    usersFromServerArg: UserI[],
    userOption: number,
  ): Todo {
    const maxId = Math.max(...todosArg.map(todo => todo.id));

    const userId = usersFromServerArg.find(user => user.id === userOption);

    return {
      id: maxId + 1 || 0,
      title: todoTitle,
      completed: false,
      userId: userId?.id || 0,
    };
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (inputValue && selectValue) {
      setTodos(prev => [
        ...prev,
        createTodo(inputValue, todos, usersFromServer, selectValue),
      ]);
      setInputValue('');
      setSelectValue(0);
      setHasInputErr(false);
      setHasSelectErr(false);
    }

    if (!inputValue) {
      setHasInputErr(true);
    }

    if (!selectValue) {
      setHasSelectErr(true);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            onChange={event => handleInput(event.target.value)}
            value={inputValue}
            type="text"
            data-cy="titleInput"
          />
          {hasInputErr && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectValue}
            onChange={event => handleSelect(+event.target.value)}
          >
            <option value={'0'}>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasSelectErr && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList getUser={getUserById} todos={todos}></TodoList>
      </section>
    </div>
  );
};
