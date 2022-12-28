import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | undefined {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || undefined;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('');
  const [newTodoUserName, setNewTodoUserName] = useState('');
  const [renderedTodos, setRenderedTodos] = useState(todos);
  const [needCheck, setNeedCheck] = useState(false);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const rightValue = value.replace(/[^a-zA-ZА-Яа-я0-9\s]/, '');

    setNewTodoTitle(rightValue);
  };

  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setNewTodoUserName(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newTodoUser: User | undefined = usersFromServer.find(
      user => user.name === newTodoUserName,
    );
    const newTodo: Todo = {
      id: Math.max(...renderedTodos.map(todo => todo.id)) + 1,
      title: newTodoTitle,
      userId: newTodoUser ? newTodoUser.id : undefined,
      completed: false,
      user: newTodoUser,
    };

    setNeedCheck(true);
    if (newTodoTitle !== '' && newTodoUserName !== '') {
      setRenderedTodos([...renderedTodos, newTodo]);
      setNewTodoTitle('');
      setNewTodoUserName('');
      setNeedCheck(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/users" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <label>
            Title:
            {' '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={newTodoTitle}
              onChange={handleChangeInput}
            />
            {(newTodoTitle === '' && needCheck)
              && (<span className="error">Please enter a title</span>)}
          </label>
        </div>

        <div className="field">
          <label>
            User:
            {' '}
            <select
              data-cy="userSelect"
              value={newTodoUserName}
              onChange={handleChangeSelect}
            >
              <option value="" disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  value={user.name}
                  key={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
            {(newTodoUserName === '' && needCheck)
              && (<span className="error">Please choose a user</span>)}
          </label>
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={renderedTodos} />
      </section>
    </div>
  );
};
