import './App.scss';
import { TodoList } from './components/TodoList';
import { useState } from 'react';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId);
}

export const App = () => {
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoUserId, setTodoUserId] = useState(0);
  const [allTodos, setAllTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );

  const titleFieldCheck = (event: React.FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.value.trim() === '') {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    return true;
  };

  const userFieldCheck = (event: React.FormEvent<HTMLSelectElement>) => {
    if (event.currentTarget.value === '0') {
      setUserError(true);
    } else {
      setUserError(false);
    }

    return true;
  };

  const getMaxId = () => {
    const arrOfId: number[] = [];

    allTodos.map((todo: Todo) => arrOfId.push(todo.id));

    arrOfId.sort((a, b) => b - a);

    return arrOfId[0] + 1;
  };

  const resetTodo = () => {
    setTodoTitle('');
    setTodoUserId(0);
  };

  const submitNewTodo = (event: React.FormEvent) => {
    event.preventDefault();

    if (todoUserId === 0) {
      setUserError(true);
    }

    if (todoTitle.trim() === '') {
      setTitleError(true);
    }

    if (todoUserId === 0 || todoTitle.trim() === '') {
      return;
    }

    const newTodo = {
      id: getMaxId(),
      title: todoTitle,
      completed: false,
      userId: todoUserId,
      user: getUserById(todoUserId),
    };

    setAllTodos([...allTodos, newTodo]);

    resetTodo();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={submitNewTodo}>
        <div className="field">
          <label htmlFor="text">
            <input
              id="text"
              type="text"
              data-cy="titleInput"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                titleFieldCheck(event) && setTodoTitle(event.target.value)
              }
              onBlur={titleFieldCheck}
              value={todoTitle}
              placeholder="Enter a title"
            />
            {titleError && <span className="error">Please enter a title</span>}
          </label>
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            <select
              id="userSelect"
              data-cy="userSelect"
              value={todoUserId}
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                userFieldCheck(event) && setTodoUserId(+event.target.value)
              }
              onBlur={userFieldCheck}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>

            {userError && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
