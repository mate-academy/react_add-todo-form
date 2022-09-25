import { useState } from 'react';
import './App.scss';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

const todosFS: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState(todosFS);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userId, setUserId] = useState('0');
  const [userError, setUserError] = useState(false);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();
          if (!title || userId === '0') {
            if (!title) {
              setTitleError(true);
            }

            if (userId === '0') {
              setUserError(true);
            }

            return;
          }

          const newUser = getUser(Number(userId));
          const newTodo: Todo = {
            id: Math.max(...todos.map(todo => todo.id)) + 1,
            userId: newUser?.id || 0,
            title,
            completed: false,
            user: newUser,
          };

          setTodos(state => [...state, newTodo]);
          setTitle('');
          setUserId('0');
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setTitleError(false);
            }}
          />
          {
            titleError
            && <span className="error">Please enter a title</span>
          }
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={(event) => {
              setUserId(event.target.value);
              setUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(userFS => {
              return (
                <option value={userFS.id} key={userFS.id}>
                  {userFS.name}
                </option>
              );
            })}
          </select>

          {
            userError
            && <span className="error">Please choose a user</span>
          }
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
