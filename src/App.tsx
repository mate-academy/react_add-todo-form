import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { Todo } from './components/Types/Todo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export type Errors = {
  titleError: boolean
  selectError: boolean
};

const getUserById = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId);
};

const initialTodos = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [errors, setErrors] = useState<Errors>({
    titleError: false,
    selectError: false,
  });
  const [inputTitle, setInputTitle] = useState<string>('');
  const [selectedUserId, setSelectedUserId] = useState<string>('0');

  const onTitleChange = (value: string) => {
    setInputTitle(value);

    setErrors((prev) => ({
      ...prev,
      titleError: false,
    }));
  };

  const onSelectChange = (value: string) => {
    setSelectedUserId(value);

    setErrors((prev) => ({
      ...prev,
      selectError: false,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (inputTitle.trim().length === 0) {
      setErrors((prev) => ({
        ...prev,
        titleError: true,
      }));
    }

    if (selectedUserId === '0') {
      setErrors((prev) => ({
        ...prev,
        selectError: true,
      }));
    }

    if (inputTitle.trim().length > 0 && selectedUserId !== '0') {
      const maxId = todos.reduce((max, todo) => (
        todo.id > max ? todo.id : max), 0);

      const newTodo: Todo = {
        id: maxId + 1,
        title: inputTitle.trim(),
        completed: false,
        userId: Number(selectedUserId),
        user: getUserById(Number(selectedUserId)),
      };

      setTodos((prev) => (
        [
          ...prev,
          newTodo,
        ]
      ));
      setInputTitle('');
      setSelectedUserId('0');
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
        onSubmit={handleSubmit}
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
              value={inputTitle}
              onChange={(event) => onTitleChange(event.target.value)}
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
              value={selectedUserId}
              onChange={(event) => onSelectChange(event.target.value)}
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
