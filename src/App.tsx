import './App.scss';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { useState } from 'react';
import { Todo } from './types/Todo';
import { User } from './types/User';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [hasErrorChooseUser, setHasErrorChooseUser] = useState(false);
  const [title, setTitle] = useState('');
  const [hasErrorTitle, setHasErrorTitle] = useState(false);

  function generatePostId(): number {
    const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;

    return maxId + 1;
  }

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasErrorChooseUser(false);
    setHasErrorTitle(false);
    let hasErrors = false;

    if (!title.trim()) {
      setHasErrorTitle(true);
      hasErrors = true;
    }

    if (!selectedUserId) {
      setHasErrorChooseUser(true);
      hasErrors = true;
    }

    if (hasErrors) {
      return;
    }

    // Находим пользователя по selectedUserId
    const selectedUser = usersFromServer.find(
      user => user.id === selectedUserId,
    );

    if (!selectedUser) {
      return;
    }

    const newTodo = {
      id: generatePostId(),
      title: title.trim(),
      userId: selectedUserId,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);

    setTitle('');
    setSelectedUserId(0);
  };

  const todosWithUsers = todos
    .map(todo => {
      const existingUser = (todo as Todo & { user?: User }).user;
      const user =
        existingUser || usersFromServer.find(u => u.id === todo.userId);

      return { ...todo, user };
    })
    .filter((todo): todo is Todo & { user: User } => !!todo.user);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleFormSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter Title"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasErrorTitle(false);
            }}
          />
          {hasErrorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="user-select">User</label>
          <select
            id="user-select"
            data-cy="userSelect"
            value={selectedUserId}
            onChange={event => {
              setSelectedUserId(+event.target.value);
              setHasErrorChooseUser(false);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersFromServer.map((user: User) => {
              return (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {hasErrorChooseUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosWithUsers} />
    </div>
  );
};
