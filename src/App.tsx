import './App.scss';
import React, { useState } from 'react';
import { TodoList } from './components/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const copyTodosFromServer = [...todosFromServer];

const prepareTodos = (todos: Todo[], users: User[]): FullTodo[] => (
  todos.map(todo => ({
    ...todo,
    user: users.find(user => user.id === todo.userId) || null,
  }))
);

export const App: React.FC = () => {
  const [todosForRender, setTodosForRender] = useState<Todo[]>(
    copyTodosFromServer,
  );
  const [selectedUserName, setSelectedUserName] = useState('');
  const [titleForTodo, setTitleForTodo] = useState('');
  const [errorTitle, setErrorTitle] = useState(true);
  const [isEmptyUser, setIsEmptyUser] = useState(true);

  const preparedTodos = prepareTodos(todosForRender, usersFromServer);

  const handleInputTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitleForTodo(event.target.value);
    setErrorTitle(true);
  };

  const handleChooseUser = ((event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserName(event.target.value);
    setIsEmptyUser(true);
  });

  const handleAddTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!titleForTodo) {
      setErrorTitle(false);
    }

    if (!selectedUserName) {
      setIsEmptyUser(false);
    }

    setTodosForRender(prevState => {
      const idTodos: number[] = [];
      const user = usersFromServer.find(
        person => person.name === selectedUserName,
      );

      if (!user || !titleForTodo) {
        return [...prevState];
      }

      prevState.forEach(todo => idTodos.push(todo.id));

      setTitleForTodo('');
      setSelectedUserName('');

      return (
        [...prevState, {
          id: Math.max(...idTodos) + 1,
          title: titleForTodo,
          completed: false,
          userId: user.id,
        }]);
    });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleAddTodo}>
        <div className="field">

          <label htmlFor="">
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={titleForTodo}
              onChange={handleInputTitle}
            />
          </label>

          {!errorTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserName}
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
        >
          Add
        </button>
      </form>

      <TodoList todos={preparedTodos} />
    </div>
  );
};
