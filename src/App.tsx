import './App.scss';
import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoWithUser } from './types/TodoWithUser';
import { TodoList } from './components/TodoList';

const getUserById = (id: number) => {
  return usersFromServer.find(user => user.id === id) || null;
};

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserNotSelected, setIsUserNotSelected] = useState(false);

  const changeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleEmpty(false);
  };

  const changeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserNotSelected(false);
  };

  const todosWithUsers: TodoWithUser[] = todos
    .map(todo => ({
      ...todo,
      user: getUserById(todo.userId) || null,
    }));

  const maxId: number = todosWithUsers.reduce((max, currentUser) => {
    return max >= currentUser.id
      ? max
      : currentUser.id;
  }, 0);

  const newTodo: Todo = {
    id: maxId + 1,
    title,
    completed: false,
    userId,
  };
  const clearForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userId && title.trim()) {
      setTodos((currentTodos) => [...currentTodos, newTodo]);
      clearForm();
      setIsTitleEmpty(false);
      setIsUserNotSelected(false);
    }

    setIsTitleEmpty(!title.trim());
    setIsUserNotSelected(!userId);
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
          <label htmlFor="title">
            {'Title: '}
          </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={changeTitle}
            placeholder="Enter a title"
          />
          {isTitleEmpty
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="username">
            {'User: '}
          </label>

          <select
            id="username"
            data-cy="userSelect"
            value={userId}
            onChange={changeUser}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}

          </select>

          {isUserNotSelected
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
