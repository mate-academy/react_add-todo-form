import './App.scss';

import { ChangeEvent, useState } from 'react';
import { TodoList } from './components/TodoList';

import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [userSelect, setUserSelect] = useState('');
  const [titleInput, setTitleInput] = useState('');
  const [newTodos, setNewTodos] = useState(todos);
  const [emtyTitle, setEmtyTitle] = useState(false);
  const [emtyId, setEmtyUser] = useState(false);

  const allId = newTodos.map(todo => todo.id);
  const maxId = Math.max(...allId);

  const handleSumbit = () => {
    if (!userSelect) {
      setEmtyUser(true);
    }

    if (!titleInput.trim()) {
      setEmtyTitle(true);
    }

    if (!userSelect || !titleInput.trim()) {
      return;
    }

    const newTodo: Todo = {
      id: maxId + 1,
      title: titleInput,
      completed: false,
      userId: +userSelect,
      user: getUser(+userSelect),
    };

    setNewTodos([
      ...newTodos,
      newTodo,
    ]);

    setUserSelect('');
    setTitleInput('');
  };

  const checkInput = (value: string) => {
    const result = value.match(/[a-zA-Zа-яА-Я\d\s]+/g);

    return result ? result.join('') : '';
  };

  const handleCgange = (e: ChangeEvent) => {
    const input = e.target as HTMLInputElement;

    if (input.id === 'titleInput') {
      setTitleInput(checkInput(input.value));
      setEmtyTitle(false);
    }

    if (input.id === 'userSelect') {
      setUserSelect(input.value);
      setEmtyUser(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={event => event.preventDefault()}
      >
        <div className="field">
          <input
            type="text"
            value={titleInput}
            data-cy="titleInput"
            id="titleInput"
            placeholder="Enter a title"
            onChange={event => handleCgange(event)}
          />

          {emtyTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userSelect}
            id="userSelect"
            onChange={event => handleCgange(event)}
          >
            <option value="" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {emtyId && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={handleSumbit}
        >
          Add
        </button>
      </form>

      <TodoList todos={newTodos} maxId={maxId} />
    </div>
  );
};
