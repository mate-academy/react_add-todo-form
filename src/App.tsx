import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (eventSubmit: React.FormEvent<HTMLFormElement>) => {
    eventSubmit.preventDefault();

    let isValid = true;

    if (title.trim() === '') {
      setTitleError(true);
      isValid = false;
    }

    if (selectedUser === 0) {
      setUserError(true);
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const newId = Math.max(0, ...todos.map(todo => todo.id)) + 1;

    const user = getUser(selectedUser);

    if (!user) {
      return;
    }

    const newTodo: Todo = {
      id: newId,
      userId: selectedUser,
      title: title.trim(),
      completed: false,
      user: user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setSelectedUser(0);
  };

  const handleChangeTitle = (
    eventTitle: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTitle(eventTitle.currentTarget.value);
    if (titleError) {
      setTitleError(false);
    }
  };

  const handleChangeUser = (
    eventUser: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUser(+eventUser.currentTarget.value);
    if (userError) {
      setUserError(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">
            {'Title: '}
            <input
              id="title"
              name="title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleChangeTitle}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user">
            <select
              id="user"
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleChangeUser}
            >
              <option value={0} disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
