import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

import { TodoList } from './components/TodoList';
import { Todo } from './types';

const App: React.FC = () => {
  const [visibleTodos, setVisibleTodos] = useState(todos);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const addNewTodo = () => {
    const todoId = visibleTodos.length + 1;

    const newTodo: Todo = {
      id: todoId,
      userId,
      title,
      completed: false,
    };

    setVisibleTodos((currTodos => [...currTodos, newTodo]));
  };

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    addNewTodo();

    resetForm();
  };

  return (
    <div className="App">
      <TodoList todos={visibleTodos} />
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          className="textInput"
          placeholder="Enter title"
          value={title}
          onChange={changeTitleHandler}
        />
        {hasTitleError && (
          <span className="error">Add name</span>
        )}
        <select
          className="select"
          onChange={e => {
            setUserId(+e.target.value);
            setHasUserIdError(false);
          }}
          value={userId}
        >
          <option value="0" disabled selected>Choose a user</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {hasUserIdError && (
          <span className="error">Choose a user</span>
        )}
        <button
          type="submit"
          className="button"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default App;
