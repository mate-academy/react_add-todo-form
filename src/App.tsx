import './App.scss';
import { useState } from 'react';

import todosFromServer from './api/todos';
import usersFromServer from './api/users';

import { TodoList } from './components/TodoList';

import { Todo } from './interfaces/interfaces';

const findUser = (userId: number) => usersFromServer.find(
  ({ id }) => id === userId,
) || null;

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: findUser(todo.userId),
}));

export const App = () => {
  const defaultTodo: Todo = {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  };

  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectError, setHasSelectError] = useState(false);
  const [userTodo, setUserTodo] = useState<Todo>(defaultTodo);

  const handleInputChange = (key: string, value: string | number) => {
    if (key === 'userId') {
      setHasSelectError(false);
    }

    if (key === 'title') {
      setHasTitleError(false);
    }

    setUserTodo((prevState) => {
      const updatedUserTodo = {
        ...prevState,
        [key]: key === 'userId' ? Number(value) : value,
      };

      return updatedUserTodo;
    });
  };

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userTodo.title.trim().length > 0 && userTodo.userId !== 0) {
      setTodos((prevTodos: Todo[]) => [
        ...prevTodos,
        {
          ...userTodo,
          id: Math.max(...todos.map(todo => todo.id)) + 1,
          user: findUser(userTodo.userId),
        },
      ]);
      setUserTodo(defaultTodo);
    } else {
      if (userTodo.title.trim().length === 0) {
        setHasTitleError(true);
      }

      if (userTodo.userId === 0) {
        setHasSelectError(true);
      }
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={(event: React.ChangeEvent<HTMLFormElement>) => {
          handleFormSubmit(event);
        }}
      >

        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={userTodo.title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              handleInputChange('title', event.target.value);
            }}
            placeholder="Enter a title"
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userTodo.userId}
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
              handleInputChange('userId', event.target.value);
            }}
            required
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map((user) => {
              return (
                <option value={user.id}>{user.name}</option>
              );
            })}
          </select>

          {hasSelectError
          && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList
          todos={todos}
        />
      </section>
    </div>
  );
};
