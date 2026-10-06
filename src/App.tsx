import React, { useState } from 'react';
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
  userId: number;
  completed: boolean;
  user: User;
};

type Props = {
  todosFromServer: Todo[];
  users: User[];
};

export const App: React.FC<Props> = ({ todosFromServer, users }) => {
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId)!,
    })),
  );
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleEmpty = !title.trim();
    const isUserEmpty = !userId;

    setTitleError(isTitleEmpty);
    setUserError(isUserEmpty);

    if (isTitleEmpty || isUserEmpty) {
      return;
    }

    const selectedUser = users.find(user => user.id === Number(userId));

    if (!selectedUser) {
      return;
    }

    const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);

    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      userId: selectedUser.id,
      completed: false,
      user: selectedUser,
    };

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setTitle('');
    setUserId('');
    setTitleError(false);
    setUserError(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>

          <input
            id="title"
            type="text"
            className="input"
            placeholder="Enter todo title"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />

          {titleError && <p className="error">Please enter a title</p>}
        </div>

        <div className="field">
          <label htmlFor="user">User</label>

          <div className="select">
            <select
              id="user"
              data-cy="userSelect"
              value={userId}
              onChange={event => {
                setUserId(event.target.value);
                setUserError(false);
              }}
            >
              <option value="">Choose a user</option>

              {users.map(user => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>

          {userError && <p className="error"> Please choose a user</p>}
        </div>

        <button
          type="submit"
          className="button is-primary"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </>
  );
};
