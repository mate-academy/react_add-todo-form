import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const copyTodosFromServer = [...todosFromServer];

const prepareTodos = (todos: Todo[], users: User[]): FullTodo[] => {
  return todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }));
};

export const App: React.FC = () => {
  const [todosForRender, setTodosForRender] = useState<Todo[]>(
    copyTodosFromServer,
  );
  const [selectedUser, setSelectedUser] = useState('');
  const [titleForTodo, setTitleForTodo] = useState('');
  const [isEmptyTitle, setIsEmptyTitle] = useState(true);
  const [isEmptyUser, setIsEmptyUser] = useState(true);

  const preparedTodos = prepareTodos(todosForRender, usersFromServer);

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleForTodo(event.target.value);
    setIsEmptyTitle(true);
  };

  const handleChooseUser = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setIsEmptyUser(true);
  });

  const handleAddTodo = () => {
    if (!titleForTodo) {
      setIsEmptyTitle(false);
    }

    if (!selectedUser) {
      setIsEmptyUser(false);
    }

    setTodosForRender(prevState => {
      const allIdTodos: number[] = [];
      const idForUser = usersFromServer.find(
        person => person.name === selectedUser,
      );

      if (!idForUser || !titleForTodo) {
        return [...prevState];
      }

      prevState.map(todo => allIdTodos.push(todo.id));

      setTitleForTodo('');
      setSelectedUser('');

      return (
        [...prevState, {
          id: Math.max(...allIdTodos) + 1,
          title: titleForTodo,
          completed: false,
          userId: idForUser.id,
        }]);
    });
  };

  // eslint-disable-next-line no-console
  console.log(todosForRender);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={(event) => event.preventDefault()}>
        <div className="field">

          <label htmlFor="">
            Title:
            {' '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={titleForTodo}
              onChange={handleInputTitle}
            />
          </label>

          {!isEmptyTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            User:
            {' '}
            <select
              data-cy="userSelect"
              value={selectedUser}
              onChange={handleChooseUser}
            >
              <option value="" disabled>Choose a user</option>

              {usersFromServer.map(user => (
                <option value={user.name} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {!isEmptyUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleAddTodo}
        >
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
