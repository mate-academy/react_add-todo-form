import { FormEvent, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

const findUser = (userId: number, userName = '') => {
  return usersFromServer.find(user => {
    if (userName) {
      return user.name === userName;
    }

    return user.id === userId;
  }) || null;
};

const todos = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: findUser(todo.userId),
  };
});

export const App = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [visibleTodos, setTodos] = useState(todos);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserNameValid, setIsUserNameValid] = useState(true);

  const handleTitle = (titleValue: string) => {
    setIsTitleValid(true);
    setTitle(titleValue.trim());
  };

  const handleUser = (chosenValue: string) => {
    setIsUserNameValid(true);
    setUserName(chosenValue);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title) {
      setIsTitleValid(false);
    }

    if (!userName) {
      setIsUserNameValid(false);
    }

    if (!title || !userName) {
      return;
    }

    const chosenUser = findUser(0, userName);

    const userIds = usersFromServer.map((user) => user.id);
    const maxUserId = Math.max(...userIds) + 1;

    if (chosenUser) {
      const newTodo: Todo = {
        id: maxUserId,
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

          {!isTitleValid && <span className="error">Please enter a title</span>}
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

          {!isUserNameValid
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
