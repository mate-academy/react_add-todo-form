import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo } from './types/Todo';
import { User } from './types/User';
import { FullTodoInfo } from './types/FullTodoInfo';

const getUserById = (userId: number) => {
  const user = usersFromServer
    .find((currentUser: User) => currentUser.id === userId);

  return user || null;
};

const todosWithUsers: FullTodoInfo[] = todosFromServer.map((todo: Todo) => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<FullTodoInfo[]>(todosWithUsers);
  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState(0);
  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const addTodo = (largestId: number) => {
    const newTodo: FullTodoInfo = {
      id: largestId + 1,
      title,
      completed: false,
      userId: +selectUser,
      user: getUserById(+selectUser),
    };

    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setHasTitleError(!title);
    setHasUserError(!selectUser);

    if (title.trim() && selectUser) {
      const largestId = Math.max(...todos.map(todo => todo.id));

      addTodo(largestId);
      setTitle('');
      setSelectUser(0);
    }
  };

  const setTitleHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const setSelectHandle = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectUser(+e.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">
            Title:
          </label>

          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={setTitleHandle}
          />
          {
            hasTitleError && !title
            && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <label htmlFor="selectUser">
            User:
          </label>

          <select
            id="selectUser"
            data-cy="userSelect"
            value={selectUser}
            onChange={setSelectHandle}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}

          </select>
          {
            hasUserError && !selectUser
            && <span className="error">Please choose a user</span>
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
