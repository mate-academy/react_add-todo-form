import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList/TodoList';

import { Todo } from './types/Todo';
import { User } from './types/User';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const preparedTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(users => users.id === todo.userId) || null,
}));

const usersFromServerFilter = usersFromServer
  .find(users => todosFromServer
    .find(todo => users.id === todo.userId)) || null;

export const App = () => {
  const [name, setName] = useState('');
  const [userSelect, setUserSelect] = useState(usersFromServerFilter);
  const [todos, setTodos] = useState<Todo[]>([...preparedTodos]);

  const [formKey, setFormKey] = useState(10);
  const [isErrorName, setIsErrorName] = useState(false);
  const [isErrorUser, setIsErrorUser] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(0);

  const id = Math.max(...todos.map(todo => todo.id));

  const addTodo = (title: string, user: User | null) => {
    const newTodo = {
      id: id + 1,
      userId: 1,
      title,
      user,
      completed: false,
    };

    setTodos([...todos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsErrorName(!name);

    setIsErrorUser(!currentUserId);

    if (name && currentUserId) {
      addTodo(name, userSelect);
      setName('');
      setFormKey(formKey + 1);
    }
  };

  const handle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    const { value } = event.target;
    const needUser = usersFromServer.find(
      item => item.name === value,
    );

    setUserSelect(needUser || null);
    setCurrentUserId(1);
  };

  const errorTitle = 'Please enter a title';
  const errorUser = 'Please choose a user';

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        key={formKey}
        action=" /api/users "
        method=" POST "
        onSubmit={handleSubmit}
      >
        <div className="field">
          Name:
          {' '}

          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a name"
            value={name}
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          {isErrorName && <span className="error">{errorTitle}</span>}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            name="users"
            id="0"
            onChange={handle}
          >
            <option>Choose a user</option>

            {usersFromServer.map(users => (
              <option
                key={users.id}
              >
                {users.name}
              </option>
            ))}

          </select>

          {(isErrorUser) && <span className="error">{errorUser}</span>}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>

      </form>

      <section className="TodoList">
        <TodoList todos={todos} />
      </section>
    </div>
  );
};
