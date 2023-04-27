import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [todoList, setTodoList] = useState(todos);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isUserEmpty, setIsUserEmpty] = useState(false);

  const maxId = todoList.reduce((max, todo) => Math.max(max, todo.id), 0);

  const handleUserSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);

    if (isUserEmpty) {
      setIsUserEmpty(false);
    }
  };

  const handleTodoTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = event.target.value;
    const regex = /^[a-zA-Zа-яА-Я0-9\s]+$/;

    if (regex.test(inputText) || inputText === '') {
      setTitle(inputText);
    }

    if (isTitleEmpty) {
      setIsTitleEmpty(false);
    }
  };

  const handleTodoAddition = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleEmpty(title.trim() === '');
    setIsUserEmpty(userId === 0);

    if (userId !== 0 && title.trim() !== '') {
      setTodoList([
        ...todoList,
        {
          id: maxId + 1,
          userId: +userId,
          title,
          completed: false,
          user: getUser(userId),
        },
      ]);

      setUserId(0);
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleTodoAddition}
      >
        <div className="field">
          <label>
            {'Title: '}

            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleTodoTitle}
            />
          </label>

          {isTitleEmpty && (
            <span className="error">
              Please enter a title
            </span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}

            <select
              data-cy="userSelect"
              required
              name="user"
              value={userId}
              onChange={handleUserSelect}
            >
              <option value="0" disabled>
                Choose a user
              </option>

              {usersFromServer.map(user => (
                <option value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isUserEmpty && (
            <span className="error">
              Please choose a user
            </span>
          )}

        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
