import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

const getUser = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
};

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectedUserId, setUser] = useState(0);
  const [title, setTitle] = useState('');
  const [allTodos, setTodo] = useState(todos);
  const [formValid, setValid] = useState(true);

  // eslint-disable-next-line prefer-const
  let newId = 0;

  allTodos.forEach(todo => {
    if (newId < todo.id) {
      newId = todo.id + 1;
    }
  });

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={(event) => {
          event.preventDefault();

          const newTodo = {
            id: newId,
            title,
            completed: false,
            userId: selectedUserId,
            user: getUser(selectedUserId),
          };

          if (selectedUserId === 0 || title === '') {
            setValid(false);

            return;
          }

          setValid(true);

          setTodo([...allTodos, newTodo]);
          setUser(0);
          setTitle('');
        }}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          {!formValid
          && (title !== ''
          || <span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUserId}
            onChange={(event) => {
              setUser(+event.target.value);
            }}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option
                key={user.username}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {!formValid
          && (selectedUserId !== 0
          || <span className="error">Please enter a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />

    </div>
  );
};
