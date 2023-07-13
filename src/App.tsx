import React, { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';
import { Todo } from './components/types/Todo';
import { TodoList } from './components/TodoList';

const getUserById = (userId: number) => {
  return usersFromServer.find((user) => user.id === userId) || null;
};

const newTodo: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userSelect, setUserSelect] = useState(0);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserSelectValid, setIsUserSelectValid] = useState(true);
  const [todos, setTodos] = useState<Todo[]>(newTodo);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(/[^0-9A-Za-zА-Яа-яҐґЇїЄє\s]/g, ''));
    setIsTitleValid(true);
  };

  const handleUserSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserSelect(+event.target.value);
    setIsUserSelectValid(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === '') {
      setIsTitleValid(false);
    }

    if (userSelect === 0) {
      setIsUserSelectValid(false);
    }

    if (title.trim() !== '' && userSelect !== 0) {
      setTodos((currentTodos) => {
        return [
          ...currentTodos,
          {
            id: todos.reduce((maxId, todo) => Math.max(maxId, todo.id), 0) + 1,
            title: title.trim(),
            userId: userSelect,
            completed: false,
            user: getUserById(+userSelect),
          },
        ];
      });

      setTitle('');
      setUserSelect(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="post-title">
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              id="post-title"
              value={title}
              onChange={handleTitleChange}
            />
            {!isTitleValid && (
              <span className="error">Please enter a title</span>
            )}
          </label>
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={userSelect}
              onChange={handleUserSelectChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {!isUserSelectValid && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
