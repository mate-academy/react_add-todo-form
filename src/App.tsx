import './App.scss';

import React, { useState } from 'react';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number) {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [selectedUser, setSelectedUser] = useState('');
  const [userError, setUserError] = useState('');
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [newTodos, setNewTodos] = useState(todos);

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setUserError('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const titleValue = event.target.value;
    const filteredTitle = titleValue.replace(/[^a-zA-Zа-яА-Я0-9\s]/g, '');

    setTitle(filteredTitle);
    setTitleError('');
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedUser === '') {
      setUserError('Please choose a user');
    }

    if (title.trim() === '') {
      setTitleError('Please enter a title');
    }

    const newId = Math.max(...todos.map(todo => todo.id));

    if (title && selectedUser) {
      const newTodo: Todo = {
        id: newId + 1,
        title,
        completed: false,
        userId: +selectedUser,
        user: getUserById(+selectedUser),
      };

      setNewTodos([...newTodos, newTodo]);
      setSelectedUser('');
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="#"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: &nbsp;</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: &nbsp;</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
          >

            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={newTodos} />
      </section>
    </div>
  );
};
