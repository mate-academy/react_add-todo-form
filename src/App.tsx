import { ChangeEvent, useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { ITodoInfo } from './types/ITodoInfo';

const initialTodos: ITodoInfo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(us => us.id === todo.userId) as User;

  return { ...todo, user };
});

export const App = () => {
  const [todos, setTodos] = useState<ITodoInfo[]>(initialTodos);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectedIdError, setHasSelectedIdError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [title, setTitle] = useState('');

  const getTodoId = (todoArr: ITodoInfo[]) => {
    const idMax = Math.max(...todoArr.map((todo: ITodoInfo) => todo.id));

    return idMax + 1;
  };

  const handlerSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() && !selectedUserId) {
      setHasTitleError(true);
      setHasSelectedIdError(true);

      return;
    }

    if (!title.trim()) {
      setHasTitleError(true);
      setHasSelectedIdError(false);

      return;
    }

    if (!selectedUserId) {
      setHasTitleError(false);
      setHasSelectedIdError(true);

      return;
    }

    const user = usersFromServer.find(
      us => us.id === Number(selectedUserId),
    ) as User;

    setTodos([
      ...todos,
      {
        id: todos.length ? getTodoId(todos) : 1,
        title,
        completed: false,
        userId: Number(selectedUserId),
        user,
      },
    ]);

    setTitle('');
    setSelectedUserId(null);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handlerSubmit}>
        <div className="field">
          <label htmlFor="user">Title:</label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
              setHasTitleError(false);
            }}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            data-cy="userSelect"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setSelectedUserId(Number(e.target.value));
              setHasSelectedIdError(false);
            }}
            value={selectedUserId ? selectedUserId : 0}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
          {hasSelectedIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      {<TodoList todos={todos} />}
    </div>
  );
};
