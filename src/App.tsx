import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import React, { useState } from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

function getUserId(userId: number): User {
  return usersFromServer.find(user => user.id === userId) as User;
}

const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserId(todo.userId),
}));

export const App = () => {
  const [inputText, setinputText] = useState('');
  const [inputUser, setInputUser] = useState(0);
  const [isText, setIsText] = useState(true);
  const [isUser, setIsUser] = useState(true);

  const [listOfTodos, setListOfTodos] = useState(todos);

  function getTheLargestTodoId(todoList: Todo[]) {
    return [...todoList].sort(
      (aTodo: Todo, bTodo: Todo) => bTodo.id - aTodo.id,
    )[0].id;
  }

  function getUserIdByName(id: number) {
    return usersFromServer.find(user => user.id === id)?.id as number;
  }

  function handleInputText(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const filteredValue = value
      .split('')
      .filter(
        el =>
          (el >= 'a' && el <= 'z') || (el >= 'A' && el <= 'Z') || el === ' ',
      );

    if (filteredValue.length === value.split('').length) {
      setinputText(value);
    }

    if (value !== '') {
      setIsText(true);
    }
  }

  function handleInputUser(e: React.ChangeEvent<HTMLSelectElement>) {
    setInputUser(Number(e.target.value));

    if (e.target.value !== '') {
      setIsUser(true);
    }
  }

  function handleAddTodo(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (inputText === '') {
      setIsText(false);
    }

    if (inputUser === 0) {
      setIsUser(false);
    }

    if (inputUser !== 0 && inputText !== '') {
      setListOfTodos([
        ...listOfTodos,
        {
          id: getTheLargestTodoId(listOfTodos) + 1,
          title: inputText,
          completed: false,
          userId: getUserIdByName(inputUser),
          user: getUserId(getUserIdByName(inputUser)),
        },
      ]);
      setinputText('');
      setInputUser(0);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <label>
            Title:&nbsp;
            <input
              value={inputText}
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              onChange={handleInputText}
            />
          </label>
          {!isText && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            User:&nbsp;
            <select
              value={inputUser}
              data-cy="userSelect"
              onChange={handleInputUser}
            >
              <option value="0" disabled selected>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {!isUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton" onClick={handleAddTodo}>
          Add
        </button>
      </form>

      <TodoList todos={listOfTodos} />
    </div>
  );
};
