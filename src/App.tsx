import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const findUser = usersFromServer.find(user => user.id === userId);

  return findUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [todo, setTodo] = useState(todos);
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);

  const [isUserErrored, setUserErrored] = useState(false);
  const [isTitleErrored, setTitleErrored] = useState(false);

  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleErrored(false);
  };

  const handleUser = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUser(+e.target.value);
    setUserErrored(false);
  };

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const titleTrim = title.trim();

    setTitleErrored(!titleTrim);

    setUserErrored(!user);

    if (titleTrim && user) {
      const newTodo = {
        id: Math.max(...todo.map((tod) => tod.id)) + 1,
        title: titleTrim,
        userId: user,
        completed: false,
        user: getUser(user),
      };

      setTodo([...todo, newTodo]);
      setTitle('');
      setUser(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addTodo}
      >
        <div className="field">
          <label htmlFor="titleId">Add title </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            value={title}
            onChange={handleTitle}
          />

          {isTitleErrored && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="selectId">User </label>
          <select
            data-cy="userSelect"
            value={user}
            onChange={handleUser}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map(item => (
              <option
                value={item.id}
                key={item.id}
              >
                {item.name}
              </option>
            ))}
          </select>

          {isUserErrored && (
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

      <TodoList todos={todo} />
    </div>
  );
};
