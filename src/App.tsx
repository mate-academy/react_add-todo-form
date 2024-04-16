import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

const getUser = (id: number) => {
  return usersFromServer.find((user: User) => user.id === id);
};

export const App = () => {
  const normalizeData = todosFromServer.map(todo => {
    return {
      ...todo,
      user: getUser(todo.userId),
    };
  });

  const [todos, setTodos] = useState<Todo[]>(normalizeData);
  const [title, setTitle] = useState<string>('');
  const [userIdx, setUserIdx] = useState<number>(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorNameUser, setErrorNameUser] = useState(false);

  const getTodoId = () => {
    return Math.max(...todos.map((todo: Todo) => +todo.id)) + 1;
  };

  const reset = () => {
    setTitle('');
    setUserIdx(0);
    setErrorTitle(false);
    setErrorNameUser(false);
  };

  const handlerChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setErrorTitle(false);
  };

  const handlerChangeUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserIdx(+e.target.value);
    setErrorNameUser(false);
  };

  const handlerSumbit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!userIdx) {
      setErrorNameUser(true);
    }

    if (!title.trim()) {
      setErrorTitle(true);
    }

    if (!userIdx || !title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: getTodoId(),
      title: title,
      completed: false,
      userId: getUser(userIdx)?.id,
      user: getUser(userIdx),
    };

    setTodos((todo: Todo[]) => [...todo, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handlerSumbit} action="/api/todos" method="POST">
        <div className="field">
          <input
            placeholder="Enter a title"
            onChange={handlerChangeTitle}
            value={title}
            type="text"
            data-cy="titleInput"
          />
          {errorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={userIdx}
            onChange={handlerChangeUser}
            data-cy="userSelect"
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {errorNameUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
