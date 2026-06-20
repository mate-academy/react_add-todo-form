import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
};

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId)!,
    })),
  );

  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);

  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasTitleError = title.trim() === '';
    const hasUserError = selectedUserId === 0;

    setTitleError(hasTitleError);
    setUserError(hasUserError);

    if (hasTitleError || hasUserError) {
      return;
    }

    const user = usersFromServer.find(
      currentUser => currentUser.id === selectedUserId,
    )!;

    const maxId = Math.max(...todos.map(todo => todo.id));

    const newTodo: Todo = {
      id: maxId + 1,
      title,
      completed: false,
      userId: selectedUserId,
      user,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setSelectedUserId(0);

    setTitleError(false);
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title</label>

          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={changeEvent => {
              setTitle(changeEvent.target.value);
              setTitleError(false);
            }}
          />

          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User</label>

          <select
            id="userSelect"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={selectEvent => {
              setSelectedUserId(Number(selectEvent.target.value));
              setUserError(false);
            }}
          >
            <option value={0}>Choose a user</option>

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

      <TodoList todos={todos} />
    </div>
  );
};
