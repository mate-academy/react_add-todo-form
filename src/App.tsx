import './App.scss';
import { useState, createContext, ReactNode, useContext } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export type User = (typeof usersFromServer)[0];

// This is needed because tests.
const initialTodoist = todosFromServer.map(element => {
  return {
    ...element,
    user: usersFromServer.find(e => e.id === element.userId)!,
  };
});

export type Todo = (typeof initialTodoist)[0];

interface ContextType {
  state: Todo[];
  saveData: (title: string, userId: number) => void;
}

// The undefined 'Context' is used if I'll have multiple providers, isn't this case.
const Context = createContext<ContextType | undefined>(undefined);

// Could use useReducer but in here we don't have actions, so we prefer don't use this feature
const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}): ReactNode => {
  const state = initialTodoist;

  const saveData = (title: string, userId: number) => {
    const newId = Math.max(...state.map(element => element.id)) + 1;

    state.push({
      id: newId,
      title: title,
      completed: false,
      userId: userId,
      user: usersFromServer.find(e => e.id === userId)!,
    });
  };

  return (
    <Context.Provider value={{ state, saveData }}>{children}</Context.Provider>
  );
};

// Even though we have a global context the tests force some props in components.
const ContentApp = () => {
  const { state, saveData } = useContext(Context)!;

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [userErrorMsg, setUserErrorMsg] = useState('');
  const [titleErrorMsg, setTitleErrorMsg] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUserErrorMsg(userId === 0 ? 'Please choose a user' : '');
    setTitleErrorMsg(title === '' ? 'Please enter a title' : '');
    if (title !== '' && userId !== 0) {
      saveData(title, userId);
      setTitle('');
      setUserId(0);
    }
  };

  const handleOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
    setTitleErrorMsg('');
  };

  const handleOnChangeSelectUser = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(+event.currentTarget.value);
    setUserErrorMsg('');
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
            placeholder={'Enter a title'}
            value={title}
            onChange={handleOnChangeTitle}
          />
          <span className="error">{titleErrorMsg}</span>
        </div>

        <div className="field">
          <label htmlFor="select">User: </label>

          <select
            id="select"
            data-cy="userSelect"
            value={userId}
            onChange={handleOnChangeSelectUser}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          <span className="error">{userErrorMsg}</span>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={state} />
    </div>
  );
};

export const App = (): ReactNode => {
  return (
    <ContextProvider>
      <ContentApp />
    </ContextProvider>
  );
};
