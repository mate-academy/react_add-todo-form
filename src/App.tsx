import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [currentToDos, setCurrentToDos] = useState(todos);

  const [title, setTitle] = useState('');
  const [chosenUser, setChosenUser] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [selectError, setSelectError] = useState(false);

  const newPostId = () => {
    const maxId = Math.max(...currentToDos.map(todo => todo.id));

    return maxId + 1;
  };

  const addToDo = (event: React.FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);

      return;
    }

    if (chosenUser === 0) {
      setSelectError(true);

      return;
    }

    const newToDo = {
      id: newPostId(),
      title: title,
      userId: chosenUser,
      completed: false,
      user: getUserById(chosenUser),
    };

    setCurrentToDos(current => [...current, newToDo]);

    setTitle('');
    setChosenUser(0);
    setSelectError(false);
    setTitleError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={addToDo}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={chosenUser}
            onChange={event => setChosenUser(+event.target.value)}
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

          {selectError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={currentToDos} />
    </div>
  );
};
