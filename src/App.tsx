import './App.scss';
import { useState } from 'react';
import { User, Todo, CombinedTodo } from './types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

const getUserById = (userId: number): User | undefined => (
  usersFromServer.find(user => user.id === userId)
);

const todos: CombinedTodo[] = todosFromServer.map((todo: Todo) => (
  {
    ...todo,
    user: getUserById(todo.userId),
  }
));

export const App = () => {
  const [todosToRender, setTodosToRender] = useState<CombinedTodo[]>(todos);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const lastTodoId = Math.max(...todosToRender.map(todo => todo.id));

  const handleTitleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleSelectedUserInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(+e.target.value);
    setHasUserError(false);
  };

  const errorToggle = () => {
    setHasTitleError(!title);
    setHasUserError(!selectedUser);
  };

  const addNewTodo = (todoTitle: string, userId: number) => {
    setTodosToRender([
      ...todosToRender, {
        id: lastTodoId + 1,
        title: todoTitle,
        completed: false,
        userId,
        user: getUserById(userId),
      }]);
  };

  const resetForm = () => {
    setTitle('');
    setHasTitleError(false);
    setSelectedUser(0);
    setHasUserError(false);
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    errorToggle();

    if (!title || !selectedUser) {
      return;
    }

    addNewTodo(title, selectedUser);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleFormSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleInput}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={handleSelectedUserInput}
          >
            <option
              value={0}
              disabled
            >
              Choose a user
            </option>

            {usersFromServer.map((user: User) => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>

        <TodoList todos={todosToRender} />
      </form>
    </div>
  );
};
