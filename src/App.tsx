import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { ChangeEvent, FormEvent, useState } from 'react';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectPersonName, setselectPersonName] = useState('');
  const [title, setTitle] = useState('');
  const [listTodos, setListTodos] = useState(todos);

  const sendForm = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const selectedUser = usersFromServer.find(
      user => user.name === selectPersonName,
    );

    if (!selectedUser) {
      return;
    }

    const newTodo = {
      id: todos.length + 1,
      title,
      completed: false,
      userId: selectedUser.id,
      user: selectedUser,
    };

    setListTodos([...listTodos, newTodo]);
  };

  // const selectInput = (event: FormEventHandler<HTMLOptionElement>) => {
  //   setselectPersonName(event.target.value);
  // };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={sendForm}>
        <div className="field">
          <label>
            Title:
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleInput}
            />
          </label>
          {!title && <span className="error">Please enter a title</span>}

        </div>

        <div className="field">
          <label>
            User:
            <select
              data-cy="userSelect"
              value={selectPersonName}
              onChange={(event) => setselectPersonName(event.target.value)}
            >
              <option value="" disabled>Choose a user:</option>
              {usersFromServer.map(user => (
                <option
                  value={user.name}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          <span className="error">Please choose a user</span>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={listTodos} />
    </div>
  );
};
