import { FC, FormEvent, useState } from 'react';

import './App.scss';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find((user) => user.id === userId);

  return foundUser || null;
}

export const todosList: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getUser(todo.userId),
}));

const highestTodoId = (list: Todo[]): number => {
  return Math.max(...list.map((todo) => todo.id));
};

export const App: FC = () => {
  const [todos, setTodos] = useState(todosList);
  const [id, setId] = useState(highestTodoId(todos));
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    switch (event.target.name) {
      case 'title':
        setTitleError(false);
        break;
      case 'user':
        setUserError(false);
        break;
      default:
        throw new Error('error');
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      title: { value: string };
      user: { value: string };
    };

    const { title, user } = target;

    if (!title.value.trim()) {
      setTitleError(true);
    }

    if (user.value === '0') {
      setUserError(true);
    }

    if (!title.value.trim() || user.value === '0') {
      return;
    }

    const todo: Todo = {
      id: id + 1,
      title: title.value,
      completed: false,
      userId: Number(user.value),
      user: getUser(Number(user.value)),
    };

    setTodos([...todos, todo]);
    setId(id + 1);

    event.currentTarget.reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          Title:
          <input
            type="text"
            onChange={handleChange}
            name="title"
            data-cy="titleInput"
            placeholder="input title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:
          <select name="user" onChange={handleChange} data-cy="userSelect">
            <option value="0" disabled selected>
              Choose a user
            </option>
            {usersFromServer.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
