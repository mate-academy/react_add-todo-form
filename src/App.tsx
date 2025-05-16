import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [users] = useState<User[]>(usersFromServer);
  const [title, setTitle] = useState<string>('');
  const [userId, setUserId] = useState(0);
  const [todos, setTodos] = useState<Todo[]>(
    todosFromServer
      .map(todo => {
        const user = usersFromServer.find(u => u.id === todo.userId);

        if (!user) {
          return undefined;
        }

        return { ...todo, user };
      })
      .filter((todo): todo is Todo => Boolean(todo)),
  );
  const [isUserSelected, setIsUserSelected] = useState(false);
  const [isTitleTyped, setIsTitleTyped] = useState(false);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState(false);
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    username: '',
    email: '',
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleTyped(event.target.value.length > 0);
    if (event.target.value.length > 0) {
      setIsTitleTyped(true);
    } else {
      setIsTitleTyped(false);
    }
  };

  const handleAddButtonClick = (event: React.MouseEvent) => {
    event.preventDefault();
    setIsAddButtonClicked(true);

    if (title.length === 0 || userId === 0) {
      return;
    }

    setTodos([
      ...todos,
      {
        id: Math.max(0, ...todos.map(todo => todo.id)) + 1,
        title: title,
        userId: userId,
        completed: false,
        user: user,
      },
    ]);
    setTitle('');
    setUserId(0);
    setIsUserSelected(false);
    setIsTitleTyped(false);
    setIsAddButtonClicked(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST">
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
          />

          {!isTitleTyped && isAddButtonClicked && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => {
              const selectedId = Number(event.target.value);

              setUserId(selectedId);

              const selectedUser = users.find(u => u.id === selectedId);

              if (selectedUser) {
                setUser(selectedUser);
                setIsUserSelected(true);
              } else {
                setIsUserSelected(false);
              }
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(userLocal => (
              <option key={userLocal.id} value={userLocal.id}>
                {userLocal.name}
              </option>
            ))}
          </select>

          {!isUserSelected && isAddButtonClicked && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={event => {
            handleAddButtonClick(event);
          }}
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
