import React, { useState } from 'react';
import './App.css';

import userServer from './api/users';
import todoServer from './api/todos';

import { TodoDesc } from './components/types/types';
import { TodoList } from './components/todoList/todoList';

const listTodo: TodoDesc[] = todoServer.map(value => ({
  ...value,
  user: userServer.find(user => user.id === value.userId),
}));

const App: React.FC = () => {
  const [todos, setTodos] = useState(listTodo);

  const [todoTitle, setTodoTitle] = useState('');
  const [hasError, setTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [userError, setUserIdError] = useState(false);

  const listUsers = userServer.map(user => {
    return (
      <option key={user.id} value={user.id}>
        {user.name}
      </option>
    );
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!todoTitle) {
      setTitleError(true);
    }

    if (!userId) {
      setUserIdError(true);
    }

    if (todoTitle && userId) {
      const newTodo = {
        userId,
        id: todoServer[todoServer.length - 1].id + 1,
        title: todoTitle,
        completed: false,
        user: userServer.find(user => user.id === userId),
      };

      setTodos([...todos, newTodo]);
      setTodoTitle('');
      setUserId(0);
    }
  };

  const changeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
    setTitleError(false);
  };

  const changeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  return (
    <div className="App">
      <TodoList value={todos} />
      <div className="Form">
        <h1 className="App__h1">Create a new todo</h1>

        <form
          className="todo-form"
          onSubmit={submit}
        >
          <div className="todo-form__wrap">

            {hasError && (
              <span className="error">
                Please enter a description
              </span>
            )}
            <input
              className="todo-form__input"
              value={todoTitle}
              onChange={changeInput}
              type="text"
              placeholder="Write description"
            />

          </div>

          <div className="todo-form__wrap">
            {userError && (
              <span className="error">
                Please choose a user!
              </span>
            )}
            <select
              className="todo-form__select"
              onChange={changeSelect}
              value={userId}
            >
              <option value="0" disabled>Choose user</option>
              {listUsers}
            </select>

          </div>

          <button type="submit" className="todo-form__button">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
