import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

export const App = () => {
  const [todoTitle, setTodoTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [hasUserError, setHasUserError] = useState(false);
  const [hasTodoTitleError, setHasTodoTitleError] = useState(false);

  const userNotFound = {
    id: 0,
    name: 'user',
    email: 'user@mail.com',
  };

  const getTodosWithUsers = () => {
    return todosFromServer.map((todo) => {
      const user = usersFromServer.find(
        ({ id }) => id === todo.userId,
      ) || userNotFound;
      const { name, id } = user;

      return {
        ...todo,
        name,
        userId: id,
        user,
      };
    });
  };

  const defaultTodosWithUsers = getTodosWithUsers();

  const [todosWithUsers, setTodosWithUsers]
    = useState<Todo[]>(defaultTodosWithUsers);

  const getMaxTodoId = ():number => {
    return Math.max(...todosWithUsers.map(({ id }) => id));
  };

  const getUseById = (idFoundBy: number) => {
    return usersFromServer
      .find(
        (userFromServer) => userFromServer.id === idFoundBy,
      ) || userNotFound;
  };

  const addNewTodo = (
    newTodoTitle: string,
    newTodoUserId: number,
  ) => {
    const newTodo = {
      id: getMaxTodoId() + 1,
      title: newTodoTitle,
      completed: false,
      userId: newTodoUserId,
      user: getUseById(newTodoUserId),
    };

    setTodosWithUsers((
      previousTodos,
    ) => [
      ...previousTodos,
      newTodo,
    ]);
  };

  const resetForm = () => {
    setTodoTitle('');
    setSelectedUserId(0);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTodoTitleError(!todoTitle);
    setHasUserError(!selectedUserId);

    if (todoTitle && selectedUserId) {
      addNewTodo(todoTitle, selectedUserId);

      resetForm();
    }
  };

  const handleInputTodoTitle = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { target: { value } } = event;

    const validTitle = value.replace(/[^A-Za-zА-Яа-я0-9 ]/g, '');

    setTodoTitle(validTitle);
    setHasTodoTitleError(!validTitle.length);
  };

  const handleSelectUser = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUserId(Number(event.target.value));
    setHasUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="newTodoTitle">
            {'Title: '}
          </label>

          <input
            id="newTodoTitle"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={todoTitle}
            onChange={handleInputTodoTitle}
          />

          {hasTodoTitleError && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userName">
            {'User: '}
          </label>
          <select
            id="userName"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={handleSelectUser}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && (
            <span className="error">
              Please choose a user
            </span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
