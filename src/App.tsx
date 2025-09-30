import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FormEvent, useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || undefined;
}

export const App = () => {
  const users = [...usersFromServer];
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: getUserById(todo.userId),
    })),
  );

  const [titleError, setTitleError] = useState(false);
  const [userChooseError, setUserChooseError] = useState(false);

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserChooseError(false);
  };

  function handleTodoSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserNotChosen = userId === 0;

    setTitleError(isTitleEmpty);
    setUserChooseError(isUserNotChosen);

    if (isTitleEmpty || isUserNotChosen) {
      return;
    }

    setTodos(prev => [
      ...prev,
      {
        id: todos.length + 1,
        title: title,
        completed: false,
        userId: userId,
        user: getUserById(userId),
      },
    ]);

    setTitle('');
    setUserId(+0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleTodoSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {userChooseError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
