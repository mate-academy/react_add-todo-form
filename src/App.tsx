import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';
import { ToDo } from './components/TSTypes/ToDo';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todosWithUsers = todosFromServer.map(todo => {
  const user = usersFromServer.find(usr => usr.id === todo.userId);

  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [toDoList, setToDoList] = useState<ToDo[]>(todosWithUsers);

  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);

  const [titleError, setTitleError] = useState<boolean>(false);
  const [userError, setUserError] = useState<boolean>(false);

  const resetFields = () => {
    setTitle('');
    setTitleError(false);

    setUserId(0);
    setUserError(false);
  };

  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = usersFromServer.find(usr => usr.id === userId);

    setTitleError(!title);
    setUserError(!userId);

    if (!userId || !title) {
      return;
    }

    const maxId = Math.max(...toDoList.map(todo => todo.id));
    const newId = maxId + 1;

    setToDoList(todoList => [
      ...todoList,
      {
        id: newId,
        title,
        userId,
        completed: false,
        user,
      },
    ]);

    resetFields();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={formSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {
            titleError
            && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(+event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(userToSelect => (
              <option
                value={userToSelect.id}
                key={userToSelect.id}
              >
                {userToSelect.name}
              </option>
            ))}
          </select>

          {
            userError
            && <span className="error">Please choose a user</span>
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={toDoList} />
    </div>
  );
};
