/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';

import { ITodo } from './types/Interface';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: Array<ITodo> = todos.map(todo => {
  return { ...todo, user: users.find(user => user.id === todo.userId) || null };
});

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [currentUserId, setcurrentUserId] = useState(0);
  const [todoList, setTodoList] = useState(preparedTodos);

  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const onSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setcurrentUserId(+event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!currentUserId);

    if (title && currentUserId) {
      const todo = {
        userId: currentUserId,
        id: todos.length + 1,
        title,
        completed: false,
        user: users.find(user => user.id === currentUserId) || null,
      };

      setTodoList([...todoList, todo]);
      setTitle('');
      setcurrentUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        method="POST"
        action="#"
        className="Form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">
          Title:
          <input
            name="title"
            placeholder="Please, enter the title!"
            value={title}
            onChange={onTitleChange}
          />
        </label>

        {titleError && (
          <span className="error">
            Please enter a title
          </span>
        )}

        <select
          title="UserId"
          name="userName"
          className="select-field"
          value={currentUserId}
          onChange={onSelectUser}
        >
          <option value="0">Choose user</option>
          {users.map(user => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>

        {userIdError && (
          <span className="error">
            Please choose a user
          </span>
        )}

        <button
          type="submit"
        >
          Submit the title
        </button>
      </form>
      <TodoList todos={todoList} />
    </div>
  );
};
