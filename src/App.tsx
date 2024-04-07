import React, { ChangeEventHandler, FormEvent, useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';

export const App = () => {
  const [text, setText] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId) || null,
    })),
  );

  function getTheLargestId() {
    const arrayWithId: number[] = [];

    todos.map(todo => arrayWithId.push(todo.id));

    arrayWithId.sort((a, b) => b - a);

    return arrayWithId[0] + 1;
  }

  const handleSubmission = (event: FormEvent) => {
    event.preventDefault();

    let isComment = true;

    if (!userId) {
      setUserError(true);
      isComment = false;
    }

    if (!text) {
      setTitleError(true);
      isComment = false;
    }

    if (!isComment) {
      return;
    }

    const userArray = usersFromServer.find(user => user.id === userId) || null;

    const newTask = {
      id: getTheLargestId(),
      userId: userId,
      title: text,
      completed: false,
      user: userArray,
    };

    setTodos([...todos, newTask]);

    setText('');
    setUserId(0);
  };

  const handleTextChange: ChangeEventHandler<HTMLInputElement> = event => {
    setText(event.target.value);
    setTitleError(false);
  };

  const handleUserChoice: ChangeEventHandler<HTMLSelectElement> = event => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmission}>
        <label htmlFor="text">
          <div className="field">
            <input
              id="text"
              name="inputTitle"
              type="text"
              data-cy="titleInput"
              placeholder="Type username"
              onChange={handleTextChange}
              value={text}
            />
            {titleError && <span className="error">Please enter a title</span>}
          </div>
        </label>

        <label htmlFor="user">
          <div className="field">
            <select
              id="user"
              name="userChoice"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChoice}
            >
              <option value="0" disabled>
                Choose a user
              </option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
            {userError && <span className="error">Please choose a user</span>}
          </div>
        </label>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
