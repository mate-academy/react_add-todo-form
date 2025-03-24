/* eslint-disable no-console */
import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import { UserInfo } from './components/UserInfo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export interface Users {
  id: number;
  name: string;
  email: string;
}

export interface Todos {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

interface NewTodos {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const App = () => {
  const [todosServer, setTodosServer] = useState(todosFromServer);
  const [selectPerson, setSelectPerson] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [titleError, setTitleError] = useState(false);

  const findMaxId = (mas: Todos[]): number => {
    const maxId = Math.max(...mas.map((item: Todos) => item.id));

    return maxId + 1;
  };

  const [newId, setNewId] = useState(() => findMaxId([...todosServer]));
  const [errorS, setErrorS] = useState(false);

  const handleSelectUser = (select: number) => {
    setSelectPerson(select);
    if (select === 0) {
      setErrorS(true);
    }
  };

  const handleTitle = (selectValue: string) => {
    setTitleValue(selectValue);

    if (!selectValue) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo: NewTodos = {
      title: titleValue,
      userId: selectPerson,
      id: newId,
      completed: false,
    };

    const titleCon = !titleValue;
    const selectCon = !selectPerson;

    if (titleCon) {
      setTitleError(true);
    } else {
      setTitleError(false);
    }

    if (selectCon) {
      setErrorS(true);
    } else {
      setErrorS(false);
    }

    if (!titleCon && !selectCon) {
      setErrorS(false);
      setTitleError(false);
      setNewId(prev => prev + 1);
      setTodosServer(prevState => [...prevState, newTodo]);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={titleValue}
            onChange={event => handleTitle(event.target.value)}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <UserInfo
          users={usersFromServer}
          onSelect={handleSelectUser}
          errors={errorS} // props
          onErrors={setErrorS} // props2
        />

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosServer} users={usersFromServer} />
    </div>
  );
};
