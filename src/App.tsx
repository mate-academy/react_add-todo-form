import './App.scss';

import { BaseSyntheticEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { Todo, User } from './types';
import { TodoList } from './components/TodoList';

const todosWithUser = todosFromServer.map((todo: Todo) => {
  const user = usersFromServer.find((author: User) => (
    author.id === todo.userId
  ));

  return {
    ...todo,
    user,
  };
});

export const App = () => {
  const [title, settitle] = useState('');

  const [userOption, setUserOption] = useState('0');

  const [todos, setTodos] = useState(todosWithUser);

  const [isDataCorrect, setIsDataCorrect] = useState(true);

  const handleTitleChange = (event: BaseSyntheticEvent) => {
    settitle(event.target.value);
  };

  const handleUserChange = (event: BaseSyntheticEvent) => {
    setUserOption(event.target.value);
  };

  const titleError
  = !isDataCorrect
  && title === '';

  const userOptionError
  = !isDataCorrect
  && userOption === '0';

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();

    if (userOption === '0' || title === '') {
      setIsDataCorrect(false);

      return;
    }

    const selectedUser = usersFromServer.find((author: User) => (
      author.id === parseInt(userOption, 10)
    ));

    const maxPrevId = todos.reduce((prev, current) => {
      return current.id > prev
        ? current.id
        : prev;
    }, 0);

    setTodos((state) => (
      [
        ...state,
        {
          id: maxPrevId + 1,
          title,
          completed: false,
          userId: selectedUser?.id || null,
          user: selectedUser,
        },
      ]));

    setIsDataCorrect(true);
    settitle('');
    setUserOption('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            placeholder="Enter a title"
            onChange={handleTitleChange}
            id="titleInput"
          />
          {
            titleError
            && (
              <span className="error">Please enter a title</span>
            )
          }
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            value={userOption}
            onChange={handleUserChange}
            id="userSelect"
          >
            <option value="0" disabled>Choose a user</option>
            {
              usersFromServer.map(({ id, name }) => (
                <option value={id} key={name}>{name}</option>
              ))
            }
          </select>

          {
            userOptionError
            && (
              <span className="error">Please choose a user</span>
            )
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
