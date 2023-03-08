import './App.scss';
import { useState, useCallback } from 'react';
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
  const [selectedUser, setSelectedUser] = useState('0');
  const [newTodos, setNewTodos] = useState(todos);
  const [isSubmited, setIsSubmitted] = useState(true);

  const createId = useCallback((lastTodos: Todo[]) => {
    const allIdes = lastTodos.map(todo => todo.id);

    return Math.max(...allIdes) + 1;
  }, [newTodos]);

  const reset = useCallback(() => {
    setTitle('');
    setSelectedUser('0');
  }, [newTodos]);

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (+selectedUser > 0 && title.length > 0) {
      setNewTodos((prevTodos) => [
        ...prevTodos,
        {
          id: createId(prevTodos),
          title,
          completed: false,
          userId: +selectedUser,
          user: getUser(+selectedUser),
        },
      ]);
      reset();
      setIsSubmitted(true);
    } else {
      setIsSubmitted(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const lastCharacter = value[value.length - 1];

    if (lastCharacter !== undefined) {
      if (lastCharacter.match(/[a-zA-Zа-яА-Я0-9 ]/)) {
        setTitle(event.target.value);
      }
    } else {
      setTitle('');
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
            onChange={handleChange}
          />
          {(!isSubmited && title.length === 0) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={(event) => setSelectedUser(event.target.value)}
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
