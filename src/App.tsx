import './App.scss';
import { TodoList } from './components/TodoList';
import { Todo } from './services/types';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

type Props = {
  onSubmit: (title: string, userId: number) => void;
};

export const App: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!userId);

    if (!title || !userId) {
      return;
    }

    onSubmit(title.trim(), userId);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit} action="/api/todos" method="POST">
        <div className="field">
          <label htmlFor="todo-title" className="label">
            Title:
          </label>
          <input
            id="todo-title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-name" className="label">
            User:
          </label>
          <select
            data-cy="userSelect"
            id="user-name"
            onChange={handleUserChange}
            //defaultValue="0"
            value={userId}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
    </div>
  );
};

export const Root = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const addTodo = (title: string, userId: number) => {
    const maxId = todos.reduce(
      (max, todo) => (todo.id > max ? todo.id : max),
      0,
    );
    const selectedUser = usersFromServer.find(user => user.id === userId);
    const newTodo: Todo = {
      id: maxId + 1,
      title: title,
      userId: userId,
      completed: false,
      user: selectedUser,
    };

    setTodos(prev => [...prev, newTodo]);
  };

  const preparedTodos = todos.map(todo => ({
    ...todo,
    user: todo.user || usersFromServer.find(user => user.id === todo.userId),
  }));

  return (
    <>
      <App onSubmit={addTodo} users={usersFromServer} />
      <TodoList todos={preparedTodos} />
    </>
  );
};
