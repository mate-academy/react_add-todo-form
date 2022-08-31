import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import './App.scss';

function getUserById(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodos, setNewTodo] = useState<Todo[]>(todos);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);
  const [titleError, setTitleError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);

  const maxId = Math.max(...newTodos.map(todo => todo.id + 1));

  const newTodo = {
    id: maxId,
    title,
    completed: false,
    userId,
    user: getUserById(userId),
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement
  | HTMLSelectElement>) => {
    const { name, value } = event.target;

    switch (name) {
      case 'title':
        setTitle(value);
        setTitleError(false);
        break;

      case 'userId':
        setUserId(Number(value));
        setUserError(false);
        break;

      default:
        break;
    }
  };

  const resetFields = () => {
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  const handleAddTodo = () => {
    if (!title.trim()) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (title.trim() && userId) {
      setNewTodo(prevTodos => (
        [...prevTodos, newTodo]
      ));

      resetFields();
    }
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
          <label>
            {'Title: '}
            <input
              type="text"
              name="title"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChange}
            />
          </label>
          {titleError
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              name="userId"
              data-cy="userSelect"
              value={userId}
              onChange={handleChange}
            >
              <option
                value="0"
                disabled
              >
                Choose a user
              </option>
              {[...usersFromServer].map(element => (
                <option
                  value={element.id}
                  key={element.id}
                >
                  {element.name}
                </option>
              ))}

            </select>
          </label>

          {userError
            && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
