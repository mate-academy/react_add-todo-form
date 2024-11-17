import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { TodosList } from './types/TodosList';
import { useState } from 'react';

interface TodoWithUser extends TodosList {
  user?: User;
}

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectUser, setSelectUser] = useState<number | null>(null);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);
  const [todosWithUsers, setTodosWithUsers] = useState<TodoWithUser[]>(
    todosFromServer.map((todo: TodosList) => {
      const matchedUser = usersFromServer.find(
        (user: User) => user.id === todo.userId,
      );

      return matchedUser
        ? { ...todo, user: matchedUser }
        : { ...todo, user: undefined };
    }),
  );

  // const getRandomNumber = () => {
  //   const existingId = todosWithUsers.map(todo => todo.id);
  //   const maxId = Math.max(0, ...existingId);

  //   for (let i = 0; i <= maxId + 1; i++) {
  //     if (!existingId.includes(i)) {
  //       return i;
  //     }
  //   }

  //   return maxId + 1;
  // };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = Number(event.target.value);

    setSelectUser(selectedValue === 0 ? null : selectedValue);

    if (selectedValue) {
      setErrorUser(false);
    }
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const regLanguage = /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]/g;
    const cleanedValue = event.target.value.replace(regLanguage, '');

    setTitle(cleanedValue);

    if (title) {
      setErrorTitle(false);
    }
  };

  const handleAdd = (event: React.FormEvent) => {
    event.preventDefault();
    let hasError = false;

    if (!title) {
      setErrorTitle(true);
      hasError = true;
    } else {
      setErrorTitle(false);
    }

    if (!selectUser) {
      setErrorUser(true);
      hasError = true;
    } else {
      setErrorUser(false);
    }

    if (hasError) {
      return;
    }

    const newId = Math.max(...todosWithUsers.map(todo => todo.id)) + 1;

    if (newId !== undefined) {
      const findUser = usersFromServer.find(users => users.id === selectUser);
      const newTodos = {
        id: newId,
        title,
        completed: false,
        userId: Number(selectUser),
        user: findUser,
      };

      setTodosWithUsers(prevTodo => [...prevTodo, newTodos]);
      setTitle('');
      setSelectUser(null);
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
          {errorTitle && !title && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <span>
            User:{' '}
            <select
              data-cy="userSelect"
              value={selectUser || 0}
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

          {errorUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosWithUsers} />
    </div>
  );
};
