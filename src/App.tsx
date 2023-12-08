import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './components/Types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const getUser = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId);
};

const InitialTodos = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export type Errors = {
  titleError: boolean
  selectError: boolean
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(InitialTodos);
  const [errors, setErrors] = useState<Errors>({
    titleError: false,
    selectError: false,
  });

  const [title, setTitle] = useState<string>('');
  const [select, setSelect] = useState<string>('0');

  const handleTitleChange = (value: string) => {
    setTitle(() => value);

    setErrors((prev) => ({
      ...prev,
      titleError: false,
    }));
  };

  const changeSelect = (value: string) => {
    setSelect(() => value);

    setErrors((prev) => ({
      ...prev,
      selectError: false,
    }));
  };

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      setErrors((prev) => ({
        ...prev,
        titleError: true,
      }));
    }

    if (select === '0') {
      setErrors((prev) => ({
        ...prev,
        selectError: true,
      }));
    }

    if (title.trim().length > 0 && select !== '0') {
      const maxId = todos.reduce((max, todo) => (
        todo.id > max ? todo.id : max), 0);

      const newTodo: Todo = {
        id: maxId + 1,
        title: title.trim(),
        completed: false,
        userId: Number(select),
        user: getUser(Number(select)),
      };

      setTodos((prev) => ([
        ...prev, newTodo]
      ));
      setTitle('');
      setSelect('0');
      setErrors(() => ({
        titleError: false,
        selectError: false,
      }));
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          <label htmlFor="titleInputId">
            Title:
            {' '}
            <input
              id="titleInputId"
              type="text"
              data-cy="titleInput"
              placeholder="Title"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
            />
          </label>
          {errors.titleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelectId">
            Select user:
            {' '}
            <select
              id="userSelectId"
              data-cy="userSelect"
              value={select}
              onChange={(e) => changeSelect(e.target.value)}
            >

              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user) => (
                <option value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
          {errors.selectError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
