import './App.scss';
import { FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';

const findUser = (userId: number, userName = '') => {
  return usersFromServer.find(user => {
    if (userName) {
      return user.name === userName;
    }

    return user.id === userId;
  }) || null;
};

const findLastId = (todos: Todo[]) => {
  return Math.max(...todos.map(todo => todo.id)) + 1;
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
  const [isTitleValid, checkTitle] = useState(true);
  const [isUserNameValid, checkUserName] = useState(true);

  const handleTitle = (titleValue: string) => {
    checkTitle(true);
    setTitle(titleValue);
  };

  const handleUserName = (userNameValue: string) => {
    checkUserName(true);
    setUserName(userNameValue);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!title) {
      checkTitle(false);
    }

    if (!userName) {
      checkUserName(false);
    }

    if (!title || !userName) {
      return;
    }

    const selectedUser = findUser(0, userName);

    if (selectedUser) {
      const newTodo: Todo = {
        id: findLastId(visibleTodos),
        title,
        completed: false,
        userId: selectedUser.id,
        user: selectedUser,
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
        onSubmit={(event) => handleSubmit(event)}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              const { value } = event.target;

              if (value.trim() !== '') {
                handleTitle(value);
              } else {
                handleTitle(value.trim());
              }
            }}
          />

          {!isTitleValid && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userName}
            onChange={(event) => handleUserName(event.target.value)}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersFromServer.map((user) => (
              <option key={user.id}>{user.name}</option>
            ))}
          </select>

          {!isUserNameValid && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
