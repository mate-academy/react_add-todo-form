import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User, Todos } from './types/types';
import { useState } from 'react';

function getUserId(userId: number): User | undefined {
  return usersFromServer.find(user => user.id === userId);
}

const initialTodo: Todos[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserId(todo.userId),
}));

function getNewTodo(todos: Todos[]) {
  const idMax = Math.max(...todos.map(todo => todo.id));

  return idMax + 1;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [todos, setTodos] = useState<Todos[]>(initialTodo);

  const reset = () => {
    setTitle('');
    setTitleError('');
    setUserId(0);
    setUserIdError(false);
  };

  const addTodos = ({ id, ...data }: Todos) => {
    const newTodo = {
      id: getNewTodo(todos),
      ...data,
    };

    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title) {
      setTitleError('Please enter a title');
    }

    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: Todos = {
      id: getNewTodo(todos),
      title,
      completed: false,
      userId,
      user: getUserId(userId),
    };

    addTodos(newTodo);

    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <select data-cy="userSelect" value={userId} onChange={handleUserId}>
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
