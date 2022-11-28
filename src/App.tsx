import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todosList: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todos, setToDos] = useState(todosList);
  const [title, setTitle] = useState('');
  const [userID, setUserID] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userIDError, setUserIDError] = useState(false);

  const users = usersFromServer;

  const resetForm = () => {
    setTitle('');
    setUserID(0);
  };

  const handleAddingToDo = (event: React.FormEvent) => {
    event.preventDefault();

    setTitleError(!title.trim());
    setUserIDError(!userID);

    let toDoID = 0;

    todos.forEach(item => {
      if (item.id > toDoID) {
        toDoID = item.id + 1;
      }
    });

    const newToDo = {
      id: toDoID,
      userId: userID,
      title,
      completed: false,
      user: getUser(userID),
    };

    if (title.trim() && userID) {
      setToDos(currentTodos => [...currentTodos, newToDo]);
      resetForm();
    }
  };

  return (
    <div className="App">
      <h1 className="App__title">Add todo form</h1>
      <form
        action="/api/users"
        method="POST"
        onSubmit={handleAddingToDo}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />

            {titleError && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              value={userID}
              onChange={(event) => setUserID(+event.target.value)}
            >
              <option value="0" disabled>Choose a user</option>
              {users.map(user => {
                return (
                  <option key={user.id} value={user.id}>{user.name}</option>
                );
              })}
            </select>
            {userIDError && (
              <span className="error">Please choose a user</span>
            )}
          </label>
        </div>

        <button type="submit" data-ce="submitButton">Add</button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
