import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './types/types';
import { Todo } from './types/types';
import { useState } from 'react';

export interface TodoWithUser extends Todo {
  user?: User;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const [todosWithUsers, setTodosWithUsers] = useState<TodoWithUser[]>(
    todosFromServer.map((todo: Todo) => {
      const matchedUser = usersFromServer.find(
        (user: User) => user.id === todo.userId,
      );

      return matchedUser ? { ...todo, user: matchedUser } : { ...todo };
    }),
  );

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);

    setSelectedUserId(selectedValue === 0 ? null : selectedValue);

    if (selectedValue) {
      setUserError(false);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedValue = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]/g,
      '',
    );

    setTitle(cleanedValue);

    if (title) {
      setTitleError(false);
    }
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!selectedUserId) {
      setUserError(true);
    }

    if (title.length && selectedUserId !== null) {
      const newId = Math.max(...todosWithUsers.map(todo => todo.id)) + 1;

      const findUser = usersFromServer.find(
        users => users.id === selectedUserId,
      );

      if (!findUser) {
        throw new Error('User not found in usersFromServer');
      }

      const newTodo = {
        id: newId,
        title,
        completed: false,
        userId: selectedUserId,
        user: findUser,
      };

      setTodosWithUsers(prevTodo => [...prevTodo, newTodo]);
      setTitle('');
      setSelectedUserId(null);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAdd}>
        <div className="field">
          <span>
            Input:{' '}
            <input
              type="text"
              data-cy="titleInput"
              value={title}
              onChange={handleInput}
              placeholder="Enter a title"
            />
          </span>
          {titleError && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <span>
            User:{' '}
            <select
              data-cy="userSelect"
              value={selectedUserId || 0}
              onChange={handleSelect}
            >
              <option value={0} disabled>
                Choose a user
              </option>
              {usersFromServer.map((u: User) => (
                <option value={u.id} key={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </span>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosWithUsers} />
    </div>
  );
};
