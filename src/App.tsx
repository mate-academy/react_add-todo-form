import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';

import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';
import { getUserById } from './utils/getUserById';

const initialTodos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

const getNewTodoId = (todos: Todo[]) => {
  const maxId = Math.max(...todos.map(todo => todo.id));

  return maxId + 1;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);

  const [selectUser, setSelectUser] = useState(0);
  const [selectUserError, setSelectUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUser(+event.target.value);
    setSelectUserError(false);
  };

  const reset = () => {
    setTitle('');
    setSelectUser(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isButtonDisabled = !title || !selectUser;

    if (isButtonDisabled) {
      setTitleError(!title);
      setSelectUserError(!selectUser);

      return;
    }

    const user = getUserById(selectUser);

    const newTodo: Todo = {
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId: selectUser,
      user,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);
    reset();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label" htmlFor="title">
            Title:
          </label>
          <input
            id="title"
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Enter title"
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label className="label" htmlFor="user">
            User:
          </label>
          <select
            id="user"
            value={selectUser}
            data-cy="userSelect"
            onChange={handleSelectChange}
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

          {selectUserError && (
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
