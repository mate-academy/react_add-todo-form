import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { useState } from 'react';

export const App: React.FC = () => {
  const findUser = (userID: number): User | undefined => {
    const user = usersFromServer.find(userFind => userFind.id === userID);

    if (!user) {
      return;
    }

    return user;
  };

  const currentTodo: Todo[] = todosFromServer.map(todo => ({
    ...todo,
    user: findUser(todo.userId),
  }));

  const [todos, setTodos] = useState<Todo[]>(currentTodo);
  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState(false);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [completed, setCompleted] = useState(false);

  const isFormatValid = Boolean(title && userId > 0);

  const addNewUser = (newTodos: Todo) => {
    setTodos(currentTodos => [...currentTodos, newTodos]);
  };

  const getNewId = (todosID: Todo[]) => {
    const maxId = Math.max(...todosID.map(todo => todo.id));

    return maxId + 1;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.length === 0) {
      setTitleError(true);
      setTitle('');
    }

    if (userId === 0) {
      setUserIdError(true);
      setUserId(0);
    }

    if (!isFormatValid) {
      return;
    }

    const user = findUser(userId);

    if (!user) {
      return;
    }

    addNewUser({
      id: getNewId(todos),
      title,
      completed,
      userId,
      user,
    });

    setTitleError(false);
    setTitle('');
    setUserId(0);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleCheckedInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCompleted(event.target.checked);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleInput}
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            value={userId}
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

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <input
          type="checkbox"
          checked={completed}
          onChange={handleCheckedInput}
        />

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
