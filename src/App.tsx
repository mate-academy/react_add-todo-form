import React, { useState } from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const visibleTodo = todos.map(todo => {
  return {
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  };
});

const App: React.FC = () => {
  const [allTodos, setAllTodos] = useState(visibleTodo);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleSelecting, setTitleSelecting] = useState(false);
  const [userSelecting, setUserSelecting] = useState(false);

  const adding = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleSelecting(true);
    }

    if (!userId) {
      setUserSelecting(true);
    }

    if (title && userId) {
      const newTodo = {
        userId,
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title,
        completed: false,
        user: users.find(user => user.id === userId) || null,
      };

      setAllTodos([...allTodos, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  const addingTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleSelecting(false);
  };

  const addingUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserSelecting(false);
  };

  return (
    <div className="App">
      <h1>Todo form</h1>
      <form
        className="App__form"
        onSubmit={adding}
      >
        <div className="input">
          <input
            className="input__item"
            name="title"
            type="text"
            placeholder="Enter your title here"
            value={title}
            onChange={addingTitle}
          />
          {titleSelecting && (
            <h3 className="input__error">
              Need a title
            </h3>
          )}
        </div>
        <div className="selection">
          <select
            className="selection__select"
            name="user"
            value={userId}
            onChange={addingUser}
          >
            <option
              disabled
              value={0}
            >
              Choose a user
            </option>
            {
              users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>
          {userSelecting && (
            <h3
              className="selection__error"
            >
              You need to choose a user
            </h3>
          )}
        </div>
        <div className="submition">
          <button
            type="submit"
            className="submition__btn"
          >
            Add
          </button>
        </div>
      </form>
      <TodoList todos={allTodos} />
    </div>
  );
};

export default App;
