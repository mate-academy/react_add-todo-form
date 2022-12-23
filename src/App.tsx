import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  return usersFromServer.find((user) => user.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [value, setValue] = useState('');
  const [select, setSelect] = useState('');
  const [visibleTodos, setTodos] = useState(todos);
  const [isValidTitle, setTitleError] = useState(false);
  const [isValidUser, setUserError] = useState(false);

  function getLargestId(todosArr: Todo[]) :number {
    const idsArr = todosArr.map((todo) => (todo.id));

    return Math.max(...idsArr) + 1;
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newTodo = {
      id: getLargestId(visibleTodos),
      userId: (Number(select)),
      title: value,
      completed: false,
      user: getUser(Number(select)),
    };

    const { title, user } = newTodo;

    if (title && user) {
      setTodos((currentTodos) => [...currentTodos, newTodo]);
      setSelect('');
      setValue('');
    }

    if (!title) {
      setTitleError(true);
    }

    if (!user) {
      setUserError(true);
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
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter the title for your todo"
              value={value}
              onChange={(e) => {
                setValue(e.currentTarget.value);
                setTitleError(false);
              }}
            />
          </label>
          {isValidTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={select}
              onChange={(e) => {
                setSelect(e.currentTarget.value);
                setUserError(false);
              }}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map((user) => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isValidUser && (
            <span className="error">Please choose a user</span>
          )}
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
