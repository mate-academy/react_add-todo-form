import { FormEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

const findUserById = (userId: number) => {
  return usersFromServer.find((user) => (
    user.id === userId
  )) || null;
};

const todos = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: findUserById(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [visibleTodos, setTodos] = useState(todos);
  const [titleValid, checkTitleValid] = useState(true);
  const [userNameValid, checkUserNameValid] = useState(true);

  const handleTitle = (titleValue: string) => {
    checkTitleValid(true);
    setTitle(titleValue);
  };

  const handleUser = (chosenValue: string) => {
    checkUserNameValid(true);
    setUserName(chosenValue);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      checkTitleValid(false);
    }

    if (!userName) {
      checkUserNameValid(false);
    }

    const chosenUser = usersFromServer
      .find((user) => (user.name === userName)) || null;

    if (title && userName) {
      if (chosenUser) {
        const newTodo: Todo = {
          id: Date.now(),
          title,
          userId: chosenUser.id,
          completed: false,
          user: chosenUser,
        };

        setTodos([
          ...visibleTodos,
          newTodo,
        ]);

        setTitle('');
        setUserName('');
      }
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="field">
          <label htmlFor="titleInput">
            Enter title:
            <input
              type="text"
              data-cy="titleInput"
              id="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={(event) => handleTitle(event.target.value)}
            />
          </label>
          {!titleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            Choose user:
            <select
              data-cy="userSelect"
              id="userSelect"
              value={userName}
              onChange={(event) => handleUser(event.target.value)}
            >
              <option value="" disabled>Choose a user</option>

              {usersFromServer.map((user) => (
                <option key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {!userNameValid
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
