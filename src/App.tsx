import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todos } from './types/Todos';

export const App = () => {
  function getUserById(userId: number) {
    return usersFromServer.find((user) => user.id === userId) || null;
  }

  const todos = todosFromServer.map((todo) => ({
    ...todo,
    user: getUserById(todo.userId),
  }));

  const getNextPostId = (todosArr: Todos[]) => {
    const maxId = Math.max(...todosArr.map((todo) => todo.id)) + 1;

    return maxId;
  };

  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [todosArr, setTodosArr] = useState(todos);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const reset = () => {
    setTitle('');
    setUserId(0);
    setTitleError(false);
    setUserError(false);
  };

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filteredTitle = event.target.value.replace(
      /[^a-zA-Zа-яА-Я0-9\s]/g, '',
    );

    setTitle(filteredTitle);
    setTitleError(false);
  };

  const handleUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const onSubmit = (newPost: Todos) => {
    setTodosArr([...todosArr, newPost]);
  };

  const requiredFields = !userId || !title;

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setUserError(!userId);
    setTitleError(!title);

    if (requiredFields) {
      return;
    }

    onSubmit({
      id: getNextPostId(todosArr),
      title,
      completed: false,
      userId,
      user: getUserById(userId),
    });
    reset();
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            value={title}
            data-cy="titleInput"
            placeholder="Enter title"
            onChange={handleTitle}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUser}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((userObj) => (
              <option value={userObj.id} key={userObj.id}>
                {userObj.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todosArr} />
    </div>
  );
};
