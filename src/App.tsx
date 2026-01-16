import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { TodoWithUser } from './types/TodoWithUser';
import { TodoList } from './components/TodoList';
import { useState } from 'react';

export const App = () => {
  const [title, setTitle] = useState('');
  const [hasErrorTitle, setHasErrorTitle] = useState(false);
  const [selectedUser, setSelectedUser] = useState(0);
  const [hasErrorSelectedUser, setHasErrorSelectedUser] = useState(false);
  const [todos, setTodos] = useState<TodoWithUser[]>(
    todosFromServer
      .map(todo => {
        const user = usersFromServer.find(person => person.id === todo.userId);

        if (!user) {
          return null;
        }

        return {
          ...todo,
          user,
        };
      })
      .filter((todo): todo is TodoWithUser => todo !== null),
  );

  const getUserById = (userId: number): User | undefined => {
    return usersFromServer.find(user => user.id === userId);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const titleError = !title.trim();
    const userError = selectedUser === 0;

    setHasErrorTitle(titleError);
    setHasErrorSelectedUser(userError);

    if (titleError || userError) {
      return;
    }

    const maxId: number = todos.reduce(
      (max, todo) => Math.max(max, todo.id),
      0,
    );

    const user = getUserById(selectedUser);

    if (!user) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: maxId + 1,
      title,
      completed: false,
      userId: selectedUser,
      user,
    };

    setTodos(prev => [...prev, newTodo]);

    setTitle('');
    setSelectedUser(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="title-input">Title: </label>
          <input
            id="title-input"
            type="text"
            placeholder="Enter a title"
            data-cy="titleInput"
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setHasErrorTitle(false);
            }}
          />
          {hasErrorTitle && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="selec-user">User: </label>
          <select
            id="selec-user"
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(+event.target.value);
              setHasErrorSelectedUser(false);
            }}
          >
            <option value={0} disabled>
              Choose a user
            </option>
            {usersFromServer.map((user: User) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>

          {hasErrorSelectedUser && (
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
