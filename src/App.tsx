import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { TodoList } from './components/TodoList';

export interface ToDo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export const App = () => {
  const usersToDos = todosFromServer
    .map(todo => {
      return {
        ...todo,
        user: usersFromServer.find(user => user.id === todo.userId),
      };
    })
    .filter((todo): todo is ToDo => todo.user !== undefined);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [visibleToDos, setVisibleToDos] = useState([...usersToDos]);

  const [titleError, setTitleError] = useState(false);
  const [userIdError, setUserIdError] = useState(false);

  const userOfToDo = usersFromServer.find(user => user.id === userId);

  function handleSubmision() {
    if (title === '') {
      setTitleError(() => true);
    }

    if (userId === 0) {
      setUserIdError(() => true);
    }

    if (title !== '' && userId !== 0 && userOfToDo) {
      setVisibleToDos(previousToDos => {
        return [
          ...previousToDos,
          {
            id: previousToDos.reduce((max, t) => Math.max(max, t.id), 0) + 1,
            title: title,
            completed: false,
            userId: userId,
            user: userOfToDo,
          },
        ];
      });

      setTitle('');
      setUserId(0);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={event => {
          handleSubmision();
          event.preventDefault();
        }}
      >
        <div className="field">
          <label htmlFor="title-input">Title: </label>
          <input
            id="title-input"
            type="text"
            data-cy="titleInput"
            placeholder={'Enter a title'}
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User: </label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              setUserId(+event.target.value);
              setUserIdError(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userIdError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={visibleToDos} />
    </div>
  );
};
