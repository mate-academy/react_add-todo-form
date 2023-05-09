import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todoList, setTodo] = useState(todos);
  const [isTitleEntered, setIsTitleEntered] = useState(true);
  const [isUserIdSelected, setIsUserIdSelected] = useState(true);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const allowedChars = /[a-z-а-щьюяґєії'\d\s]/i;

    if (allowedChars.test(inputValue.slice(-1)) || !inputValue) {
      setIsTitleEntered(true);
      setTitle(inputValue);
    }
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsUserIdSelected(true);
    setUserId(+event.target.value);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setIsTitleEntered(false);
    }

    if (!userId) {
      setIsUserIdSelected(false);
    }

    if (title && userId) {
      const newTodo: Todo = {
        id: Math.max(...todoList.map(todo => todo.id)) + 1,
        title,
        completed: false,
        userId,
        user: getUser(userId),
      };

      setTodo([...todoList, newTodo]);
      resetForm();
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
            Title:
            {' '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTitleChange}
            />
          </label>
          {!isTitleEntered && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            {' '}
            <select
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user: User) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!isUserIdSelected && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todoList={todoList} />
    </div>
  );
};
