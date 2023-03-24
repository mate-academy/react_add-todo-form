import './App.scss';
import { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

function getMaximalId(todoes: Todo[]) {
  return Math.max(...todoes.map((todo) => todo.id)) + 1;
}

export const todoesList: Todo[] = [...todosFromServer].map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);
  const [todoes, setNewTodo] = useState(todoesList);
  const [isHaveTitle, setIsHaveTitle] = useState(false);
  const [isHaveUserId, setIsHaveUserId] = useState(false);

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsHaveTitle(false);
  };

  const handleChangeSelected = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(Number(event.target.value));
    setIsHaveUserId(false);
  };

  const resetState = () => {
    setTitle('');
    setUserId(0);
    setIsHaveTitle(false);
    setIsHaveUserId(false);
  };

  const addNewTodo = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newTodo: Todo = {
      id: getMaximalId(todoes),
      title,
      completed: false,
      userId,
      user: getUser(userId),
    };

    if (title.length === 0) {
      setIsHaveTitle(true);
    }

    if (userId < 1) {
      setIsHaveUserId(true);
    }

    if (!isHaveTitle && userId > 0) {
      setNewTodo([...todoes, newTodo]);

      resetState();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={addNewTodo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleChangeTitle}
          />
          {isHaveTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={Number(userId)}
            onChange={handleChangeSelected}
          >
            <option disabled value={0}>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isHaveUserId && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoes} />
    </div>
  );
};
