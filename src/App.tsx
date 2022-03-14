/* eslint-disable no-console */
import React, { useState } from 'react';
import './App.scss';

import todos from './api/todos';
import users from './api/users';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { User } from './types/User';

const preparedTodo: Todo[] = todos.map(task => ({
  ...task,
  user: users.find(user => (user.id === task.userId)) as User,
}));

const App: React.FC = () => {
  const selectionCall = 'Choose Your Fighter';

  const [todoList, setTodos] = useState(preparedTodo);
  const [user, setUser] = useState(selectionCall);
  const [title, setTitle] = useState('');
  const [isValidTitle, setisValidTitle] = useState(false);
  const [isValideUser, setIsValideUser] = useState(false);
  const [titleErrorDisplay, setTitleErrorDisplay] = useState(false);
  const [userErrorDisplay, setUserErrorDisplay] = useState(false);

  const titleErrorHandler = (value: string) => {
    if (value !== '') {
      setisValidTitle(true);
    } else {
      setisValidTitle(false);
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
      setUserErrorDisplay(false);
    }

    if (isValidTitle) {
      setTitleErrorDisplay(false);
    }
  };

  const addNewTodo = () => {
    const newTodo: Todo = {
      userId: 0,
      id: Math.max(...todoList.map(todo => todo.id), 0) + 1,
      title,
      user: users.find(person => person.name === user) as User,
      completed: false,
    };

    setTodos([...todoList, newTodo]);
  };

  const submitAction = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title === '') {
      setTitleErrorDisplay(true);
      setisValidTitle(false);
    }

    if (user === selectionCall) {
      setUserErrorDisplay(true);
      setIsValideUser(false);
    }

    errorCheck();

    if (!isValidTitle || !isValidTitle) {
      return;
    }

    if (isValidTitle && isValideUser) {
      setIsValideUser(false);
      setisValidTitle(false);
      addNewTodo();
      setUser(selectionCall);
      setTitle('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        className="form"
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
              setTitleErrorDisplay(false);
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
              setUserErrorDisplay(false);
              userErrorHandler(event.target.value);
            }}
          >
            <option value={selectionCall}>
              Choose You Fighter
            </option>
            {users.map(el => (
              <option
                key={el.id}
                value={el.name}
              >
                {el.name}
              </option>
            ))}
          </select>
          {userErrorDisplay && (
            <p className="error">
              please, choose someone!
            </p>
          )}

        </label>
        <button type="submit">
          add
        </button>
      </form>

      <TodoList todos={todoList} />

    </div>

  );
};

export default App;
