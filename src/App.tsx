import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

const listOfTodo = () => {
  return todosFromServer.map(todo => {
    const user = usersFromServer.find(item => todo.userId === item.id);

    return {
      ...todo,
      user,
    };
  });
};

export const App = () => {
  const [historyChange, setHistoryChange] = useState([...listOfTodo()]);
  const [inputTitle, setInputTitle] = useState('');
  const [selectUser, setSelectUser] = useState<number | ''>('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const maxId =
    historyChange.length > 0
      ? Math.max(...historyChange.map(todo => todo.id))
      : 0;

  const uniqueUsers = usersFromServer.reduce(
    (acc, item) => {
      if (!acc.some(user => user.id === item.id)) {
        acc.push(item);
      }

      return acc;
    },
    [] as { id: number; name: string }[],
  );

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === '' ? '' : Number(event.target.value);

    setSelectUser(value);
    setUserError(false);
  };

  const findUser =
    typeof selectUser === 'number'
      ? usersFromServer.find(user => user.id === selectUser)
      : undefined;

  const addTodo = () => {
    const isTitleEmpty = inputTitle.trim() === '';
    const isUserEmpty = selectUser === '';

    setTitleError(isTitleEmpty);
    setUserError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    if (!findUser) {
      return;
    }

    const newId = maxId + 1;

    const newTodo = {
      id: newId,
      title: inputTitle.trim(),
      completed: false,
      user: {
        id: findUser.id,
        name: findUser.name,
        username: findUser.username,
        email: findUser.email,
      },
      userId: findUser.id,
    };

    setHistoryChange(prev => [...prev, newTodo]);

    setInputTitle('');
    setSelectUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={e => {
          e.preventDefault();
          addTodo();
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={inputTitle}
            onChange={handleTitle}
            placeholder="Enter title"
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectUser}
            onChange={handleSelectUser}
          >
            <option value="">Choose a user</option>

            {uniqueUsers.map(item => {
              return (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              );
            })}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={historyChange} />
    </div>
  );
};
