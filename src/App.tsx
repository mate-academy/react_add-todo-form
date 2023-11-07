import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './api/types/Todo';

const getUserById = (userId:number) => {
  return usersFromServer.find(user => user.id === userId);
};

const initialTodos = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [newTitle, setNewTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const REGEX = /^[a-zA-Zа-яА-ЯЇїІіЄєҐґ'0-9 ]*$/;

    if (!REGEX.test(e.target.value)) {
      return;
    }

    setNewTitle(e.target.value);
    setTitleError(false);
  };

  const handleSelect = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setUserIdError(false);
  };

  const handleSubmit = (e:React.FormEvent) => {
    e.preventDefault();

    setTitleError(!newTitle);
    setUserIdError(!userId);

    if (!newTitle || !userId) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;

    setTodos(prevTodos => [
      ...prevTodos,
      {
        id: newId,
        title: newTitle,
        completed: false,
        userId,
        user: getUserById(userId),
      },
    ]);

    setNewTitle('');
    setUserId(0);
    setTitleError(false);
    setUserIdError(false);
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
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTitle}
            onChange={handleChange}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleSelect}
          >
            <option value="0">
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList
        todos={todos}
      />
    </div>
  );
};
