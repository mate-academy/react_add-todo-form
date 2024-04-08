import { FormEventHandler, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | undefined;
};

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export const App = () => {
  const todosWithUsers: Todo[] = todosFromServer.map(todo => {
    return {
      ...todo,
      user: usersFromServer.find((user: User) => user.id === todo.id),
    };
  });

  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState(todosWithUsers);
  const [title, setTitle] = useState('');
  const [displayUserError, setDisplayUserError] = useState(false);
  const [displayTitleError, setDisplayTitleError] = useState(false);

  const getHighestTodoId: () => number = () => {
    let highestTodoId = 0;

    for (const todo of todos) {
      if (todo.id > highestTodoId) {
        highestTodoId = todo.id;
      }
    }

    return highestTodoId;
  };

  const handleSubmit: FormEventHandler = event => {
    event.preventDefault();

    const highestTodoId = getHighestTodoId();

    const newTodo: Todo = {
      id: highestTodoId + 1,
      title: title,
      completed: false,
      userId: +userId,
      user: usersFromServer[userId - 1],
    };

    let errors = 0;

    if (!userId) {
      // Display user error
      setDisplayUserError(true);
      errors++;
    }

    if (!title.length) {
      setDisplayTitleError(true);
      errors++;
    }

    if (!errors) {
      setTodos(currentTodos => {
        return [...currentTodos, newTodo];
      });
      setUserId(0);
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => handleSubmit(event)}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={event => {
              setTitle(event.target.value);
              setDisplayTitleError(false);
            }}
            value={title}
          />
          {displayTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            id="user"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setDisplayUserError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((currentUser: User) => (
              <option value={currentUser.id.toString()} key={currentUser.id}>
                {currentUser.name}
              </option>
            ))}
          </select>

          {displayUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
