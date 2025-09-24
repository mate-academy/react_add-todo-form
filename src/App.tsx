import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User, Todo } from './components/types/types';

const listOfTodo = (): Todo[] => {
  return todosFromServer
    .map(todo => {
      const user = usersFromServer.find(u => u.id === todo.userId);

      if (!user) {
        return null;
      }

      return {
        ...todo,
        user,
      };
    })
    .filter((todo): todo is Todo => todo !== null);
};

export const App = () => {
  const [historyChange, setHistoryChange] = useState<Todo[]>(listOfTodo());
  const [inputTitle, setInputTitle] = useState('');
  const [selectUser, setSelectUser] = useState<number | ''>('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const maxId =
    historyChange.length > 0
      ? Math.max(...historyChange.map(todo => todo.id))
      : 0;

  const uniqueUsers = usersFromServer.reduce((acc, item) => {
    if (!acc.some(user => user.id === item.id)) {
      acc.push(item);
    }

    return acc;
  }, [] as User[]);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputTitle(event.target.value);
    setTitleError(false);
  };

  const handleSelectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value === '' ? '' : Number(event.target.value);

    setSelectUser(value);
    setUserError(false);
  };

  const addTodo = () => {
    const isTitleEmpty = inputTitle.trim() === '';
    const isUserEmpty = selectUser === '';

    setTitleError(isTitleEmpty);
    setUserError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    const findUser =
      typeof selectUser === 'number'
        ? usersFromServer.find(user => user.id === selectUser)
        : undefined;

    if (!findUser) {
      return;
    }

    const newTodo: Todo = {
      id: maxId + 1,
      title: inputTitle.trim(),
      completed: false,
      userId: findUser.id,
      user: findUser,
    };

    setHistoryChange(prev => [...prev, newTodo]);
    setInputTitle('');
    setSelectUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={event => {
          event.preventDefault();
          addTodo();
        }}
      >
        <div className="field">
          <label htmlFor="titleInput">Title</label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={inputTitle}
            onChange={handleTitle}
            placeholder="Enter title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectUser}
            onChange={handleSelectUser}
          >
            <option value="">Choose a user</option>
            {uniqueUsers.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
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
