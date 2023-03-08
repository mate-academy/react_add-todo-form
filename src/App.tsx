import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const findUser = usersFromServer.find(user => user.id === userId);

  return findUser || null;
}

const todos = todosFromServer.map((todo) => (
  {
    ...todo,
    user: getUser(todo.userId),
  }
));

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, chooseUser] = useState('0');
  const [newTodos, addTodo] = useState(todos);
  const [isSubmited, changeSubmited] = useState(true);

  const createId = (lastTodos: Todo[]) => {
    const allIdes = lastTodos.map(todo => todo.id);

    return Math.max(...allIdes) + 1;
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (+selectedUser > 0 && title.length > 0) {
      addTodo((prevTodos) => ([
        ...prevTodos,
        {
          id: createId(prevTodos),
          title,
          completed: false,
          userId: +selectedUser,
          user: getUser(+selectedUser),
        },
      ]));
      setTitle('');
      chooseUser('0');
      changeSubmited(true);
    } else {
      changeSubmited(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={title}
            onChange={(event) => {
              const { value } = event.target;
              const lastCharacter = value[value.length - 1];

              if (lastCharacter !== undefined) {
                if (lastCharacter.match(/[a-zA-Zа-яА-Я0-9 ]/)) {
                  setTitle(event.target.value);
                }
              } else {
                setTitle('');
              }
            }}
          />
          {(!isSubmited && title.length === 0) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => {
              return chooseUser(event.target.value);
            }}
          >
            <option
              value="0"
              disabled
            >
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {(+selectedUser === 0 && !isSubmited) && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
