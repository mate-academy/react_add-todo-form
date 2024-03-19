import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { useState } from 'react';

interface ServerTodo {
  completed: boolean;
  id: number;
  title: string;
  userId: number;
}

function getUserFromId(todo: ServerTodo): User {
  return usersFromServer.find(user => user.id === todo.userId) as User;
}

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserFromId(todo),
}));

const regex = /^[a-zA-Za-яА-ЯiІіЇїґҐєЄ0-9\s]+$/;

export const App = () => {
  const [todosArray, setTodosArray] = useState<Todo[]>(preparedTodos);

  const [selectedUser, setSelectedUser] = useState(0);
  const [hasSelectedUserError, setHasSelectedUserError] = useState(false);
  const [isDefaultDisabled, setIsDefaultDisabled] = useState(false);

  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const handleSelectedUserError = () => {
    if (selectedUser === 0) {
      setHasSelectedUserError(true);
    }
  };

  const handleHasTitleError = () => {
    if (title === '') {
      setHasTitleError(true);
    }
  };

  const addTodo = (newTodo: Todo) =>
    setTodosArray(currentTodos => [...currentTodos, newTodo]);

  const handleSelectedUserChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedUser(+event.target.value);
    setHasSelectedUserError(false);
    setIsDefaultDisabled(true);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (regex.test(event.target.value[event.target.value.length - 1])) {
      setTitle(event.target.value);
    }

    setHasTitleError(false);
  };

  const reset = () => {
    setIsDefaultDisabled(false);
    setSelectedUser(0);
    setHasSelectedUserError(false);

    setTitle('');
    setHasTitleError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    handleSelectedUserError();
    handleHasTitleError();

    if (selectedUser === 0 || title === '') {
      return;
    }

    addTodo({
      completed: false,
      id: Math.max(...todosArray.map(todo => todo.id)) + 1,
      title: title,
      user: usersFromServer.find(user => user.id === selectedUser) as User,
      userId: selectedUser,
    });

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
            value={title}
            onChange={event => handleTitleChange(event)}
            placeholder="Name your todo"
          />

          {hasTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={event => handleSelectedUserChange(event)}
            value={selectedUser}
          >
            <option value="0" disabled={isDefaultDisabled}>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasSelectedUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosArray} />
    </div>
  );
};
