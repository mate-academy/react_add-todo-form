import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

type FormEvent = React.ChangeEvent<HTMLFormElement>;
type InputEvent = React.ChangeEvent<HTMLInputElement>;
type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [visibleTodos, setTodos] = useState(todos);
  const [userId, setUserId] = useState(0);
  const [task, setTask] = useState('');
  const [isTaskError, setIsTaskError] = useState(false);
  const [isAuthorError, setIsAuthorError] = useState(false);

  const resetFormHandler = () => {
    setTask('');
    setUserId(0);
    setIsTaskError(false);
    setIsAuthorError(false);
  };

  const updateTodos = () => {
    setIsTaskError(!task.length);
    setIsAuthorError(!userId);

    if (task.length > 0 && userId) {
      const maxId = Math.max(...todos.map(todo => todo.id));
      const newTodo: Todo = {
        id: maxId + 1,
        userId,
        title: task,
        completed: false,
        user: getUser(userId),
      };

      todos.push(newTodo);
      setTodos(todos);
      resetFormHandler();
    }
  };

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    updateTodos();
  };

  const changeTitleHandler = (e: InputEvent) => {
    setTask(e.target.value);
    setIsTaskError(false);
  };

  const changeUserHandler = (e: SelectEvent) => {
    setUserId(Number(e.target.value));
    setIsAuthorError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitFormHandler}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={task}
            onChange={changeTitleHandler}
          />
          {isTaskError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>

          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={changeUserHandler}
          >
            <option value={0}>Choose a user</option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isAuthorError && <span className="error">Please choose a user</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
