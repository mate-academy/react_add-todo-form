import React, { FormEventHandler, useState } from 'react';
import './App.scss';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [userId, setUserId] = useState('0');
  const [title, setTitle] = useState('');
  const [todoList, setTodoList] = useState<Todo[]>(todos);
  const [isUserError, setIsUserError] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (title !== '' && userId !== '0') {
      const todosId = todoList.map(todo => todo.id);

      const newTodo: Todo = {
        id: Math.max(...todosId) + 1,
        title,
        completed: false,
        userId: Number(userId),
        user: getUser(Number(userId)),
      };

      setTodoList((prevTodoList) => [...prevTodoList, newTodo]);

      setTitle('');
      setUserId('0');
    }

    if (title === '') {
      setIsTitleError(true);
    }

    if (+userId === 0) {
      setIsUserError(true);
    }
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleUser = (event:
  { target: { value: React.SetStateAction<string>; }; }) => {
    setUserId(event.target.value);
    setIsUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitle}
            />
          </label>
          {isTitleError
            && (<span className="error">Please enter a title</span>)}

        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              required
              value={userId}
              defaultValue="0"
              onChange={handleUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(u => {
                return (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                );
              })}
            </select>
          </label>
          {isUserError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todoList} />
    </div>
  );
};
