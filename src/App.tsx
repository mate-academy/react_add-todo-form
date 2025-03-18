import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/types';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
};

const preparedTodos = todosFromServer.map((todo: Todo) => {
  return {
    ...todo,
    user: usersFromServer.find((user: User) => todo.userId === user.id),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleHasError, setTitleHasError] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userHasError, setUserHasError] = useState(false);
  const [visibleTodos, setVisibleTodos] = useState(preparedTodos);

  const titleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleHasError(false);
  };

  const userHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserHasError(false);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    setTitleHasError(title === '');
    setUserHasError(userId === 0);

    if (title.trim() === '' || userId === 0) {
      return;
    }

    const highestId = Math.max(...preparedTodos.map(todo => todo.id), 0);

    const newTodo = {
      id: highestId + 1,
      title,
      completed: false,
      userId,
      user: usersFromServer.find((user: User) => userId === user.id),
    };

    setVisibleTodos(prev => [...prev, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={submitHandler}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={titleHandler}
          />
          {titleHasError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={userHandler}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map((user: User, index: number) => {
              return (
                <option value={user.id} key={`${user.id}-${index}`}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {userHasError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
