import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import { Todo, todoList } from './entities/Todo';
import { sanitizeTitle } from './utils/sanitizeTitle';

export const App: React.FC = () => {
  const [newTitle, setNewTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [updatedTodoList, setUpdatedTodoList] = useState(todoList);

  const getNewTaskId = () => {
    const maxToDoId = Math.max(...updatedTodoList.map(task => task.id));

    return maxToDoId + 1;
  };

  const reset = () => {
    setNewTitle('');
    setSelectedUserId(0);
  };

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTitle.trim()) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (!selectedUserId) {
      setUserError(true);
    } else {
      setUserError(false);
    }

    if (!newTitle.trim() || !selectedUserId) {
      return;
    }

    const newUser = usersFromServer.find(user => user.id === selectedUserId);

    if (!newUser) {
      setUserError(true);

      return;
    }

    const newTask: Todo = {
      id: getNewTaskId(),
      title: newTitle,
      completed: false,
      userId: newUser.id,
      user: newUser,
    };

    setUpdatedTodoList(currentToDoList => [...currentToDoList, newTask]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addTodo}>
        <div className="field">
          <label htmlFor="title">Title:&nbsp;</label>
          <input
            name="title"
            id="title"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            aria-invalid={titleError}
            value={newTitle}
            onChange={event => {
              setNewTitle(sanitizeTitle(event.target.value));
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:&nbsp;</label>
          <select
            name="user"
            id="user"
            data-cy="userSelect"
            aria-invalid={userError}
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(user => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={updatedTodoList} />
    </div>
  );
};
