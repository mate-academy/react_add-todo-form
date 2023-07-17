import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoType } from './types/TodoType';
import { TodoList } from './components/TodoList';
import { getNewId, getUser } from './components/helpers';

const getTodos: TodoType[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [todos, setTodos] = useState(getTodos);
  const [selectedUserID, setSelectedUserID] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const isTitleExist = !selectedUserID || !title.trim();

  const formOnSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError(true);
    }

    if (!selectedUserID) {
      setUserError(true);
    }

    if (isTitleExist) {
      return;
    }

    const newId = getNewId(todos);

    const newTodo: TodoType = {
      id: newId,
      completed: false,
      user: getUser(Number(selectedUserID)),
      title: title.trim(),
      userId: selectedUserID,
    };

    setTodos((prevTodos) => [...prevTodos, newTodo]);

    setTitle('');
    setSelectedUserID(0);
  };

  const handleChangeUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserID(+event.target.value);
    setUserError(false);
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={formOnSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleChangeTitle}
          />
          {titleError && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserID}
            onChange={handleChangeUser}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (user
              && (<option value={user.id} key={user.id}>{user.name}</option>)
            ))}

          </select>
          {userError && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
