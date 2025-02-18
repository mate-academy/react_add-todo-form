import './App.scss';
import React from 'react';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

export const App: React.FC = () => {
  const userList = usersFromServer;
  const todos = todosFromServer.map(todo => ({
    ...todo,
    user: userList.find(user => user.id === todo.userId) || null,
  }));

  const [titleValue, setTitleValue] = useState<string>('');
  const [selectedUserID, setSelectedUserID] = useState<number>(0);

  const [isTitleEmpty, setIsTitleEmpty] = useState<boolean>(false);
  const [isSelectEmpty, setIsSelectEmpty] = useState<boolean>(false);

  const [todosList, setTodosList] = useState<Todo[]>(todos);

  function clearForm() {
    setTitleValue('');
    setSelectedUserID(0);
  }

  function addTodo() {
    const maxId = Math.max(...todosList.map(todo => todo.id));
    const todo: Todo = {
      id: maxId + 1,
      title: titleValue,
      completed: false,
      userId: selectedUserID,
      user: userList.find(user => user.id === selectedUserID) || null,
    };

    setTodosList(prevTodoses => [...prevTodoses, todo]);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setIsSelectEmpty(!selectedUserID);

    if (titleValue.trim() === '') {
      setIsTitleEmpty(true);
    } else {
      setIsTitleEmpty(false);
    }

    if (!selectedUserID || !titleValue.trim()) {
      return;
    }

    addTodo();
    clearForm();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            placeholder="Enter a title"
            id="title"
            value={titleValue}
            type="text"
            data-cy="titleInput"
            onChange={ev => {
              setTitleValue(ev.target.value);
              setIsTitleEmpty(false);
            }}
          />
          {isTitleEmpty && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="select">User: </label>
          <select
            id="select"
            value={selectedUserID}
            data-cy="userSelect"
            onChange={ev => {
              setSelectedUserID(+ev.target.value);
              setIsSelectEmpty(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {userList.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isSelectEmpty && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
