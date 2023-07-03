import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './Types/Todo';
import './App.scss';

import { getUserById } from './Helpers/getUser';
import { getNewTodoId } from './Helpers/getNewTodoId';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './Types/User';

const todosWithUsers: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId, usersFromServer),
}));

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUsers);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number | string>('');
  const [isTitleValid, setIsTitleValid] = useState<boolean>(true);
  const [isUserSelected, setIsUserSelected] = useState<boolean>(true);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

      if (!title) {
        setIsTitleValid(false);
      }

      if (!userId) {
        setIsUserSelected(false);
      }

     if (!title || !userId) {
        return;
      }

    const newTodo = {
      id: getNewTodoId(todos),
      userId: +userId,
      title,
      completed: false,
      user: getUserById(+userId, usersFromServer),
    };

    setTodos((current => [...current, newTodo]));

    setTitle('');
    setUserId('');
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(event.target.value);
    setIsUserSelected(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleValid(true);
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
          <input
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            name="todoTitle"
            onChange={handleTitleChange}
          />
          {!isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            name="userSelect"
            onChange={handleUserChange}
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
      <TodoList todos={todos} />
    </div>
  );
};
