import './App.scss';
import React, { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const defaultOption = 'Choose a user';
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedUserError, setSelectedUserError] = useState(false);
  const [todos, setTodos] = useState(preparedTodos);

  const handleChange = (event:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+event.target.value);
    setSelectedUserError(false);
  };

  const handleTitleChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const addTodo = (todo:Todo) => {
    setTodos((current) => [...current, todo]);
  };

  const clear = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event:React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !selectedUserId) {
      setTitleError(!title);
      setSelectedUserError(!selectedUserId);

      return;
    }

    const getTheBiggestId = Math.max(...todos.map((todo) => todo.id));
    const newUser = getUserById(selectedUserId);
    const newTodo = {
      id: getTheBiggestId + 1,
      title,
      completed: false,
      userId: selectedUserId,
      user: newUser,
    };

    addTodo(newTodo);
    clear();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label>
            <span> Title: </span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            <span> User: </span>
            <select
              data-cy="userSelect"
              onChange={handleChange}
              value={selectedUserId}
            >
              <option value={0} disabled>{defaultOption}</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>))}
            </select>
          </label>

          {selectedUserError && (
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
