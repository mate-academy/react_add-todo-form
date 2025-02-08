import './App.scss';
import { TodoList } from './components/TodoList';
import todosFromServer from './api/todos';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Todo } from './types';
import usersFromServer from './api/users';

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);

  const onChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();

    if (!title) {
      setTitleError(true);
    }

    if (!userId) {
      setUserError(true);
    }

    if (!title || !userId) {
      return;
    }

    setTodos(prevState => [
      ...prevState,
      {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: title,
        completed: false,
        userId: +userId,
      },
    ]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={submitHandler}>
        <div className="field">
          <label>
            Title:{' '}
            <input
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              onChange={onChangeTitle}
              value={title}
            />
          </label>
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select data-cy="userSelect" onChange={handleChange} value={userId}>
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: { id: number; name: string }) => (
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
      <TodoList todos={todos} />
    </div>
  );
};
