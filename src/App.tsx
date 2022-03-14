import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';

const preparedTodo: Todo[] = todos.map(task => {
  return {
    ...task,
    user: users.find(user => (user.id === task.userId)) as User,
  };
});

const App: React.FC = () => {
  const selectionCall = 'Chose Your Fighter';

  const [todoList, setTodos] = useState(preparedTodo);
  const [user, setUser] = useState(selectionCall);
  const [title, setTitle] = useState('');
  const [isValideTitle, setIsValideTitle] = useState(false);
  const [isValideUser, setIsValideUser] = useState(false);
  const [titleErrorDisplay, setTitleError] = useState(false);
  const [userErrorDisplay, setUserError] = useState(false);

  const titleErrorHandler = (value: string) => {
    if (value !== '') {
      setIsValideTitle(true);
    } else {
      setIsValideTitle(false);
    }
  };

  const userErrorHandler = (value: string) => {
    if (value !== selectionCall) {
      setIsValideUser(true);
    } else {
      setIsValideUser(false);
    }
  };

  const errorCheck = () => {
    if (isValideUser) {
      setUserError(false);
    }

    if (isValideTitle) {
      setTitleError(false);
    }
  };

  const addNewTodo = () => {
    const newTodo: Todo = {
      userId: 0,
      id: todoList.length + 1,
      title,
      user: users.find(person => person.name === user) as User,
      completed: false,
    };

    setTodos([...todoList, newTodo]);
  };

  const submitAction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '') {
      setTitleError(true);
      setIsValideTitle(false);
    }

    if (user === selectionCall) {
      setUserError(true);
      setIsValideUser(false);
    }

    errorCheck();

    if (!isValideTitle || !isValideTitle) {
      return;
    }

    if (isValideTitle && isValideUser) {
      setIsValideUser(false);
      setIsValideTitle(false);
      addNewTodo();
      setUser(selectionCall);
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/"
        onSubmit={(event) => {
          submitAction(event);
        }}
      >
        <label htmlFor="text">
          <input
            id="text"
            value={title}
            type="text"
            placeholder="input some text..."
            onChange={(event) => {
              setTitle(event.target.value);
              titleErrorHandler(event.target.value);
            }}
          />
          {titleErrorDisplay && (
            <p className="error">
              name your title please
            </p>
          )}
        </label>
        <label htmlFor="select">
          <select
            id="select"
            value={user}
            onChange={(event) => {
              setUser(event.target.value);
              userErrorHandler(event.target.value);
            }}
          >
            <option value={selectionCall}>
              Choose You Fighter
            </option>
            {users.map(el => {
              return (
                <option value={el.name}>
                  {el.name}
                </option>
              );
            })}
          </select>
          {userErrorDisplay && (
            <p className="error">
              please, chose someone!
            </p>
          )}

        </label>
        <button
          type="submit"
        >
          add
        </button>
      </form>

      <TodoList todos={todoList} />

    </div>

  );
};

export default App;
