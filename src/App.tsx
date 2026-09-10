import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { ToDo } from './types/ToDo';
import { TodoList } from './components/TodoList';

const users: User[] = usersFromServer;

const todos: ToDo[] = todosFromServer.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export const App = () => {
  const [newTitle, setNewTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');

  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const [updatedTodos, setUpdatedTodos] = useState<ToDo[]>(todos);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isNewTitleEmpty = !newTitle.trim();
    const isAnySelectedUser = !selectedUser;

    setIsTitleError(isNewTitleEmpty);
    setIsUserError(isAnySelectedUser);

    if (isNewTitleEmpty || isAnySelectedUser) {
      return;
    }

    const newTodo: ToDo = {
      id: Math.max(...updatedTodos.map(todo => todo.id)) + 1,
      title: newTitle,
      completed: false,
      userId: +selectedUser,
      user: users.find(user => user.id === +selectedUser),
    };

    setUpdatedTodos([...updatedTodos, newTodo]);

    setNewTitle('');
    setSelectedUser('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={newTitle}
            placeholder="Enter a title"
            onChange={event => {
              setNewTitle(event.target.value);
              setIsTitleError(false);
            }}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={event => {
              setSelectedUser(event.target.value);
              setIsUserError(false);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {users.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={updatedTodos} />
    </div>
  );
};
