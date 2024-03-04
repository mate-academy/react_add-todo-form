import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { getUserById } from './services/user';
import { Todo } from './types/Todo';
import { User } from './types/User';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

function getNewTodoId(todos: Todo[]) {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
}

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState('');

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState('');

  const addTodo = (todo: Todo) => {
    setTodos(currentTodo => [...currentTodo, todo]);
  };

  const clear = () => {
    setTitle('');
    setUserId(0);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const handleUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (!userId) {
      setUserIdError('Please choose a user');
    }

    if (!title || !userId) {
      return;
    }

    addTodo({
      id: getNewTodoId(todos),
      title,
      userId,
      completed: false,
      user: getUserById(userId),
    });

    clear();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="input-title">Title: </label>
          <input
            id="input-title"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitle}
          />
          <span className="error">{titleError}</span>
        </div>

        <div className="field">
          <label htmlFor="select-user">User: </label>
          <select
            id="select-user"
            data-cy="userSelect"
            value={userId}
            onChange={handleUserId}
          >
            <option defaultValue="0" disabled={userId !== 0}>
              Choose a user
            </option>

            {usersFromServer.map((user: User) => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">{userIdError}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
