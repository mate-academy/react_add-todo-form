import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ToDo } from './types/ToDo';
import { TodoList } from './components/TodoList';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export const preparedTodos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setToDos] = useState<ToDo[]>(preparedTodos);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);

  const [titleError, setTitleError] = useState<boolean>(false);
  const [userIdError, setUserIdError] = useState<boolean>(false);

  const reset = () => {
    setTitle('');
    setUserId(0);

    setTitleError(false);
    setUserIdError(false);
  };

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const userIdChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserIdError(false);
  };

  const onSubmitFunc = (newUserId: number, newTitle: string) => {
    const newToDo: ToDo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      title: newTitle,
      completed: false,
      userId: newUserId,
      user: getUserById(userId),
    };

    setToDos(currentTodos => [...currentTodos, newToDo]);
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserIdError(true);
    }

    if (!title || !userId) {
      return;
    }

    onSubmitFunc(userId, title);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={onSubmitHandler}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={titleChangeHandler}
          />
          {titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId.toString()}
            onChange={userIdChangeHandler}
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))
            }
          </select>

          {userIdError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
