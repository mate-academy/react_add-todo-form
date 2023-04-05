import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList/TodoList';

function getUser(userId: number): User | undefined {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || undefined;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [addNewTodo, setTodo] = useState(todos);
  const [isTitleSelected, setIsTitleSelected] = useState(true);
  const [isUserSelected, setIsUserSelected] = useState(true);

  const clearForm = () => {
    setTitle('');
    setUser('');
  };

  const addTodo = () => {
    const findUser = usersFromServer.find(
      userFS => userFS.name === user,
    );

    const largeId = Math.max(...todos.map(todo => todo.id)) + 1;

    const newTodo = {
      id: largeId,
      title,
      completed: false,
      userId: findUser?.id && undefined,
      user: findUser,
    };

    const newAdd = [...addNewTodo];

    newAdd.push(newTodo);

    if (title && user) {
      setTodo(newAdd);
      clearForm();
    }

    if (!title) {
      setIsTitleSelected(false);
    }

    if (!user) {
      setIsUserSelected(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    addTodo();
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleSelected(true);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
    setIsUserSelected(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleId">
            Title:
          </label>
          <input
            type="text"
            data-cy="titleInput"
            name="titleId"
            value={title}
            placeholder="Please enter a title"
            onChange={handleTitle}
          />

          {!isTitleSelected
          && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <label htmlFor="userSelectedId">
            User:
          </label>

          <select
            name="userSelectedId"
            data-cy="userSelect"
            value={user}
            onChange={handleUser}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(userFS => (
              <option
                key={userFS.id}
                value={userFS.name}
              >
                {userFS.name}
              </option>
            ))}
          </select>

          {!isUserSelected
          && (<span className="error">Please choose a user</span>)}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={addNewTodo} />
    </div>
  );
};
