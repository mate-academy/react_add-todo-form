import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './Types/Todo';
import './App.scss';

import { getUserById } from './Helpers/getUser';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './Types/User';

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number | string>('');
  const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
  const [isUserSelected, setIsUserSelected] = useState<boolean>(true);

  const todosWithUsers: Todo[] = todos.map(todo => ({
    ...todo,
    user: getUserById(todo.userId, usersFromServer),
  }));

  const addTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title || !userId) {
      if (!title) {
        setIsTitleValid(false);
      }

      if (!userId) {
        setIsUserSelected(false);
      }

      return;
    }

    const maxId = Math.max(...todos.map(todo => todo.id));

    const user = getUserById(+userId, usersFromServer);

    if (user) {
      setTodos((current => [
        ...current,
        {
          id: maxId + 1,
          userId: user.id,
          title,
          completed: false,
          user,
        },
      ]));
    }

    setTitle('');
    setUserId('');
  };

  const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setIsUserSelected(true);
  };

  const addTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleValid(true);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            name="todoTitle"
            onChange={addTitle}
          />
          {!isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            name="userSelect"
            onChange={selectUser}
            data-cy="userSelect"
            value={userId}
          >
            <option
              value=""
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
          {!isUserSelected
            && <span className="error">Please choose a user</span>}
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
