import React, { useState } from 'react';

import { TodoList } from './components/TodoList';

import { Todo } from './types';
import { User } from './types';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const getCompletedTodoList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todoList, setTodoList] = useState<Todo[]>(getCompletedTodoList);
  const [titleValue, setTitleValue] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userIdValue, setUserIdValue] = useState<number | ''>('');
  const [userError, setUserError] = useState('');

  const trimmedValue = titleValue.trim();

  const getTodoListId = (todos: Todo[]): number => {
    const maxId = Math.max(...todos.map(todo => todo.id), 0);

    return maxId + 1;
  };

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setTitleValue(e.target.value);
    setTitleError('');
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setUserIdValue(e.target.value ? +e.target.value : '');
    setUserError('');
  }

  const reset = () => {
    setTitleValue('');
    setUserIdValue('');
  };

  function addTodoToList(todo: Todo) {
    setTodoList(prevList => [...prevList, todo]);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!trimmedValue) {
      setTitleError('Please enter a title');
    }

    if (!userIdValue) {
      setUserError('Please choose a user');
    }

    if (!trimmedValue || !userIdValue) {
      return;
    }

    addTodoToList({
      id: getTodoListId(todoList),
      title: trimmedValue,
      completed: false,
      userId: userIdValue,
      user: getUserById(userIdValue),
    });

    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            Title:&nbsp;
            <input
              type="text"
              name="title"
              placeholder="Enter a title"
              data-cy="titleInput"
              value={titleValue}
              onChange={handleInputChange}
            />
          </label>
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:&nbsp;</label>
          <select
            name="user"
            data-cy="userSelect"
            value={userIdValue}
            onChange={handleSelectChange}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
