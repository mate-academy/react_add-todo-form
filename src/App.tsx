import React, { useState } from 'react';
import './App.scss';
import cn from 'classnames';

import users from './api/users';
import todos from './api/todos';
import { TodoList } from './components/TodoList/TodoList';

const preparedTodos: Todo[] = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId) || null,
}));

const App: React.FC = () => {
  const [todosList, setTodoList] = useState([...preparedTodos]);
  const [selectedUser, setselectedUser] = useState(0);
  const [title, setTitle] = useState('');
  const [hasInvalidTitle, setHasInvalidTitle] = useState(false);
  const [hasInvalidUser, setHasInvalidUser] = useState(false);

  const newTodos = () => (
    [...todosList, {
      userId: selectedUser,
      id: todosList.length - 1,
      title,
      completed: false,
      user: users.find(user => user.id === selectedUser),
    }]
  );

  const addTodo = (event: React.FormEvent) => {
    event.preventDefault();

    setHasInvalidTitle(!title);
    setHasInvalidUser(!selectedUser);

    if (title && selectedUser) {
      setTodoList(newTodos);
      setTitle('');
      setselectedUser(0);
    }
  };

  return (
    <div className="App container is-widescreen">
      <h1>Static list of todos</h1>
      <form
        onSubmit={addTodo}
      >
        <div className="notification is-primary">
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Add task"
            value={title}
            onChange={(event) => {
              setTitle(event.target.value);
              setHasInvalidTitle(false);
            }}
            className={cn(
              { error: hasInvalidTitle },
              'input is-medium',
            )}
          />

          <span>
            {hasInvalidTitle && (
              'Please enter the title'
            )}
          </span>
        </div>

        <div className="notification is-primary">
          <select
            value={selectedUser}
            onChange={(event) => {
              setselectedUser(+event.target.value);
              setHasInvalidUser(false);
            }}
            className={cn(
              { error: hasInvalidUser },
            )}
          >
            <option value={0} disabled>
              Choose User
            </option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>

          <span>
            {hasInvalidUser && (
              'Please choose a User'
            )}
          </span>
        </div>
        <div className="notification is-primary">
          <button
            type="submit"
            className="button is-success is-light"
          >
            Add To Do
          </button>
        </div>

      </form>
      <TodoList preparedTodos={todosList} />
    </div>

  );
};

export default App;
