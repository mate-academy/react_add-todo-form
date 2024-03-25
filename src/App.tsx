import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { getPreparedUserById } from './services/preperedUserById';


export const preparedTodos: Todo[] = todosFromServer.map((todo) => ({
  ...todo,
  user: getPreparedUserById(todo.userId),
}));

const getMaxTodoId = (todos: Todo[]) => {
  const ids = todos.map(todo => todo.id);

  return Math.max(...ids, 0);
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(preparedTodos);
  const [title, setTitle] = useState('');
  const [selectUserId, setSelectUserId] = useState(0);

  const [isTitleError, setIsTitleError] = useState(false);
  const [isSelectUserIdError, setIsSelectUserIdError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUserId(Number(event.target.value));
    setIsSelectUserIdError(false);
  };

  const addTodo = (newTodo: Todo) => {
    setTodos(currentTodo => [...currentTodo, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsTitleError(!title);
    setIsSelectUserIdError(!selectUserId);

    if (!title || !selectUserId) {
      return;
    }

    addTodo({
      id: getMaxTodoId(todos) + 1,
      user: usersFromServer.find(user => user.id === +selectUserId) as User,
      title: title,
      completed: false,
      userId: +selectUserId,
    });

    setTitle('');
    setSelectUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userId">User: </label>
          <select
            id="userId"
            value={selectUserId}
            data-cy="userSelect"
            onChange={handleUserChange}
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

          {isSelectUserIdError && (
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
