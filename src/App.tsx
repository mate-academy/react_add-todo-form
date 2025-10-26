import { useState } from 'react';
import './App.scss';
import { PreparedTodo, User } from './types';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

function getUser(userID: number): User {
  const foundUser = usersFromServer.find(user => user.id === userID);

  if (!foundUser) {
    throw new Error(`User with Id ${userID} not found`);
  }

  return foundUser;
}

const preparedToDo: PreparedTodo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todoList, setToDoList] = useState(preparedToDo);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [userError, setUserError] = useState(false);
  const [titleError, setTitleError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const cleanValue = rawValue.replace(/[^a-zA-Zа-яА-ЯёЁіІїЇєЄ0-9\s]/g, '');

    setTitle(cleanValue);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const formHandle = (event: React.FormEvent) => {
    event.preventDefault();

    let hasError = false;

    if (title.trim() === '') {
      setTitleError(true);
      hasError = true;
    }

    if (userId === 0) {
      setUserError(true);
      hasError = true;
    }

    if (hasError === true) {
      return;
    }

    const newID =
      todoList.length > 0 ? Math.max(...todoList.map(todo => todo.id)) + 1 : 1;

    const newToDo: PreparedTodo = {
      id: newID,
      title: title.trim(),
      completed: false,
      userId,
      user: getUser(userId),
    };

    setToDoList([...todoList, newToDo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={formHandle}>
        <div className="field">
          <label htmlFor="titleL">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="titleL"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userL">User: </label>
          <select
            data-cy="userSelect"
            id="userL"
            value={userId}
            onChange={handleUserChange}
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

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todoList} />
    </div>
  );
};
