import './App.scss';

import { FC, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const todos = todosFromServer.map((todo) => {
  return {
    ...todo,
    user: usersFromServer.find((user) => user.id === todo.userId) || null,
  };
});

export const App: FC = () => {
  const [title, setTitle] = useState('');
  const [userName, setUserName] = useState('');
  const [hasTitle, setHasTitle] = useState(true);
  const [selectedUser, setSelectedUser] = useState(true);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todos);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();

          if (title && userName) {
            const usersId: number[] = visibleTodos.map((todo) => todo.id);
            const maxId: number = Math.max(...usersId);
            const newUser = usersFromServer.find((user) => {
              return user.name === userName;
            });
            const newTodo: Todo = {
              id: maxId + 1,
              title,
              completed: false,
              userId: newUser?.id || 0,
              user: newUser || null,
            };

            setVisibleTodos([
              ...visibleTodos,
              newTodo,
            ]);

            setUserName('');
            setTitle('');
          }

          if (!title) {
            setHasTitle(false);
          }

          if (!userName) {
            setSelectedUser(false);
          }
        }}
      >
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setHasTitle(true);
            }}
          />

          {!hasTitle
          && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setSelectedUser(true);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => {
              return <option key={user.id}>{user.name}</option>;
            })}
          </select>

          {!selectedUser
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
