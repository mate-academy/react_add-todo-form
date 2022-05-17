import React, { ChangeEvent, useState } from 'react';

import todos from './api/todos';
import users from './api/users';

import TodoList from './components/TodoList/TodoList';
import { Todo } from './types/Todo';

import './App.scss';

const preparedTodos: Todo[] = todos.map((todo) => ({
  ...todo,
  user: users.find((user) => user.id === todo.userId),
}));

const App: React.FC = () => {
  const [todosList, setTodos] = useState(preparedTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isErrorTitle, setIsErrorTitle] = useState(false);
  const [isErrorUser, setIsErrorUser] = useState(false);

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title.trim()) {
      setIsErrorTitle(true);
    }

    if (!userId) {
      setIsErrorUser(true);
    }

    if (title && userId) {
      const newTodo = {
        userId,
        id: todos[todos.length - 1].id + 1,
        title,
        completed: false,
        user: users.find(user => user.id === userId),
      };

      setTodos(currentTodos => (
        [...currentTodos,
          newTodo]
      ));

      setUserId(0);
      setTitle('');
    }
  };

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsErrorTitle(false);
  };

  const handleUser = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setIsErrorUser(false);
  };

  return (
    <div className="todo">
      <form
        method="POST"
        name="addTodo"
        className="todo__form todo-form"
        onSubmit={addTodo}
      >
        <h2 className="todo-form__title">Add todo</h2>

        <label className="todo-form__title-label">
          <input
            type="text"
            name="title"
            className="todo-form__field"
            placeholder="Please enter a title"
            value={title}
            onChange={handleTitle}
          />
        </label>

        <div className="todo-form__error">
          {isErrorTitle && (
            <span className="todo-form__error-message">
              Please enter a title
            </span>
          )}
        </div>

        <select
          name="users"
          className="todo-form__field"
          value={userId}
          onChange={handleUser}
        >
          <option value="0" disabled>
            Please choose a user
          </option>

          {users.map(user => (
            <option
              key={user.id}
              value={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        <div className="todo-form__error">
          {isErrorUser && (
            <span className="todo-form__error-message">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          className="todo-form__submit"

        >
          ADD
        </button>
      </form>

      <h1 className="todo__title">Static list of todos</h1>

      <TodoList
        todos={todosList}
      />
    </div>
  );
};

export default App;
