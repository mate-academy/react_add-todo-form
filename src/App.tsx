import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

function getUserByName(userName: string): User | undefined {
  return usersFromServer.find(user => user.name === userName);
}

export const App = () => {
  const [visibleTodos, setTodos] = useState(todos);
  const [author, setAuthor] = useState('Choose a user');
  const [task, setTask] = useState('');
  const [isActiveTask, setIsActiveTask] = useState(false);
  const [isActiveAuthor, setIsActiveAuthor] = useState(false);
  const [isTaskError, setIsTaskError] = useState(false);
  const [isAuthorError, setIsAuthorError] = useState(false);

  const updateTodos = () => {
    setIsTaskError(!isActiveTask);
    setIsAuthorError(!isActiveAuthor);

    if (isActiveTask && isActiveAuthor) {
      const maxId = Math.max(...todos.map(todo => todo.id));
      const newTodo: Todo = {
        id: maxId + 1,
        userId: getUserByName(author)?.id,
        title: task,
        completed: false,
        user: getUserByName(author),
      };

      todos.push(newTodo);
      setTodos(todos);
      setTask('');
      setAuthor('Choose a user');
      setIsActiveTask(false);
      setIsActiveAuthor(false);
      setIsTaskError(false);
      setIsAuthorError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(e) => {
          e.preventDefault();
          updateTodos();
        }}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>

          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
              setIsActiveTask(true);
              setIsTaskError(false);
            }}
          />
          {isTaskError
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="title">User: </label>

          <select
            data-cy="userSelect"
            id="title"
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              setIsActiveAuthor(true);
              setIsAuthorError(false);
            }}
          >
            <option value="">Choose a user</option>
            {usersFromServer.map(user => (
              <option
                value={user.name}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {isAuthorError
          && <span className="error">Please choose a user</span>}
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
