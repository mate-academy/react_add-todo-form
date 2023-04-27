import './App.scss';
import { FC, useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: FC = () => {
  const [titleValue, setTitleValue] = useState('');
  const [usersValue, setUsersValue] = useState<string>('0');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newIndex = Math.max(...visibleTodos.map(todo => todo.id)) + 1;

    const elementToAdd: Todo = {
      id: newIndex,
      title: titleValue,
      completed: false,
      userId: +usersValue,
      user: getUser(+usersValue),
    };

    setVisibleTodos([...visibleTodos, elementToAdd]);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title here"
              value={titleValue}
              onChange={event => setTitleValue(event.target.value)}
            />
            <span className="error">Please enter a title</span>
          </label>
        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={usersValue}
              onChange={(event) => setUsersValue(event.target.value)}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user) => (
                <option
                  value={user.id}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            <span className="error">Please choose a user</span>
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleTodos} />
    </div>
  );
};
