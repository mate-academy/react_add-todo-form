import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import './App.scss';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';

const getUserById = (id: number): User | null => {
  return usersFromServer.find(user => user.id === id) || null;
};

const preperTodo: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId) || null,
}));

const getNewTodoId = (todos: Todo[]): number =>
  Math.max(...todos.map(todo => todo.id)) + 1;

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preperTodo);

  const [title, setTitle] = useState('');
  const [hasTitleEmpty, setHasTitleEmpty] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserEmpty, setHasUserEmpty] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title && !userId) {
      setHasTitleEmpty(true);
      setHasUserEmpty(true);

      return;
    } else if (!title) {
      return setHasTitleEmpty(true);
    } else if (!userId) {
      return setHasUserEmpty(true);
    }

    setTodos(current => {
      const newTodo = {
        id: getNewTodoId(current),
        title,
        completed: false,
        userId,
        user: getUserById(userId),
      };

      return [...current, newTodo];
    });

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            onChange={e => {
              setTitle(e.target.value);
              setHasTitleEmpty(false);
            }}
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
          />
          {hasTitleEmpty && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            onChange={e => {
              setUserId(+e.target.value);
              setHasUserEmpty(false);
            }}
            value={userId}
            data-cy="userSelect"
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserEmpty && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
