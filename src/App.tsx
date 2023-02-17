import './App.scss';

import { FormEvent, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';
import { User } from './Types/User';
import { Todo } from './Types/Todo';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [input, setInput] = useState('');
  const [select, setSelect] = useState('0');
  const [newTodos, setTodos] = useState(todos);
  const [validation, setValidation] = useState(false);

  function error(typeOfInput: string): boolean {
    if (typeOfInput === 'input') {
      return validation && input.trim() === '';
    }

    return validation && select === '0';
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (select === '0' || input.trim() === '') {
      setValidation(true);

      return;
    }

    const maxNumber = Math.max(...newTodos.map(item => item.id));

    const selectedUser = usersFromServer.find(
      (author: User) => (author.name === select),
    );

    if (!selectedUser) {
      return;
    }

    setTodos(prev => [
      ...prev,
      {
        id: maxNumber + 1,
        userId: selectedUser.id,
        completed: false,
        title: input,
        user: selectedUser,
      },
    ]);

    setSelect('0');
    setInput('');
    setValidation(false);
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
          <label htmlFor="title">
            Title:
            <input
              id="title"
              placeholder="Enter a title"
              type="text"
              data-cy="titleInput"
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
              }}
            />
          </label>
          {error('input') && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="">
            User:
            <select
              data-cy="userSelect"
              value={select}
              onChange={(event) => {
                setSelect(event.target.value);
              }}
            >
              <option value="0">Choose a user</option>
              {usersFromServer.map(user => (
                <option key={user.id} value={user.name}>{user.name}</option>
              ))}
            </select>
          </label>
          {error('select') && (
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
