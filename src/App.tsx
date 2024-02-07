import React, { useState } from 'react';

import './App.scss';
import users from './api/users';
import todos from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const initialUser: User = {
  id: 0,
  name: '',
  username: '',
  email: '',
};
const initialTodo: Todo = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
  user: initialUser,
};
const findUser = (id: number): User => (
  users.find(user => user.id === id) || initialUser
);
const setId = (todoList: Todo[]) => {
  const id = Math.max(
    ...todoList.map(todo => todo.id),
  );

  return id + 1;
};

const todoListWithUsers = todos.map(todo => (
  {
    ...todo,
    user: findUser(todo.userId),
  }
));

export const App = () => {
  const [formCounter, setFormCounter] = useState(0);
  const [todoList, setTodoList] = useState<Todo[]>(todoListWithUsers);
  const [newTodo, setNewTodo] = useState<Todo>(initialTodo);
  const [hasFormError, setHasFormError] = useState({
    titleError: '',
    userError: '',
  });

  const checkForErrors = (checkedTodo: Todo) => {
    if (checkedTodo.title.trim().length === 0) {
      setHasFormError(currentError => ({
        ...currentError,
        titleError: 'Please enter a title',
      }));
    }

    if (checkedTodo.userId === 0) {
      setHasFormError(currentError => ({
        ...currentError,
        userError: 'Please choose a user',
      }));
    }
  };

  const resetFields = () => {
    setNewTodo(initialTodo);
    setHasFormError({
      titleError: '',
      userError: '',
    });
    setFormCounter(count => count + 1);
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const user = findUser(+event.target.value);

    if (user) {
      setHasFormError((currentErrors) => ({
        ...currentErrors,
        userError: '',
      }));
    }

    setNewTodo((currentTodo) => ({
      ...currentTodo,
      id: setId(todoList),
      userId: user.id,
      user,
    }));
  };

  const handleTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Check for spaces only in string.

    // if (event.target.value.trim().length === 0) {
    //   setHasFormError((currentErrors) => ({
    //     ...currentErrors,
    //     titleError: '',
    //   }));
    // }

    setHasFormError((currentErrors) => ({
      ...currentErrors,
      titleError: '',
    }));

    setNewTodo(currentTodo => ({
      ...currentTodo,
      title: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (newTodo.id === 0 || newTodo.title.trim().length === 0) {
      checkForErrors(newTodo);

      return;
    }

    setTodoList(currentTodosList => (
      [...currentTodosList,
        newTodo,
      ]
    ));

    resetFields();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        key={formCounter}
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title-field">Title: </label>
          <input
            type="text"
            id="title-field"
            name="title"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={newTodo.title}
            onChange={handleTodoTitle}
          />
          <span className="error">
            {hasFormError.titleError}
          </span>
        </div>

        <div className="field">
          <label htmlFor="user-field">User: </label>
          <select
            data-cy="userSelect"
            id="user-field"
            value={newTodo.userId}
            onChange={handleUserId}
          >
            <option value="0" disabled>Choose a user</option>
            {users.map(({ id, name }) => (
              <option
                value={id}
                key={id}
              >
                {name}
              </option>
            ))}
          </select>

          <span className="error">
            {hasFormError.userError}
          </span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        visibleTodos={todoList}
      />
    </div>
  );
};
