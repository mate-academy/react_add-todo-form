import { ChangeEvent, useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo, User } from './types/types';
import { ITodoInfo } from './types/ITodoInfo';

const getUserById = (userId: number): User | undefined => {
  return usersFromServer.find(user => user.id === userId);
};

const initialTodos: ITodoInfo[] = todosFromServer.map(todo => {
  return { ...todo, user: getUserById(todo.userId) };
});

export const App = () => {
  const [todos, setTodos] = useState<ITodoInfo[]>(initialTodos);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasSelectedIdError, setHasSelectedIdError] = useState(false);

  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');

  const getTodoId = (todoArr: ITodoInfo[]) => {
    const idMax = Math.max(...todoArr.map((todo: ITodoInfo) => todo.id), 0);

    return idMax + 1;
  };

  const handleChangeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(Number(e.target.value));
    setHasSelectedIdError(false);
  };

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setHasTitleError(true);
    }

    if (!selectedUserId) {
      setHasSelectedIdError(true);
    }

    if (!selectedUserId || !title.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: getTodoId(todos),
      title,
      completed: false,
      userId: Number(selectedUserId),
      user: getUserById(Number(selectedUserId)),
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="user">Title:</label>
          <input
            type="text"
            id="title"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleChangeInput}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">User:</label>
          <select
            data-cy="userSelect"
            onChange={handleChangeSelect}
            value={selectedUserId}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasSelectedIdError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
