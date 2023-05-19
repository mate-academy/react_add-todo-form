import './App.scss';
import { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { User } from './types/User';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const getTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [selectedId, setSelectedId] = useState('0');
  const [newTitile, setNewTitle] = useState('');
  const [todos, setTodos] = useState(getTodos);
  const [noTitleError, setNoTitleError] = useState(true);
  const [noUserError, setNoUserError] = useState(true);

  const selectHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setSelectedId(event.target.value);
    setNoUserError(true);
  };

  const titleHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setNewTitle(event.target.value.replace(/[^\w\s]/gi, ''));
    setNoTitleError(true);
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newTitile) {
      setNoTitleError(false);
    }

    if (selectedId === '0') {
      setNoUserError(false);
    }

    if (!newTitile || selectedId === '0') {
      return;
    }

    const maxId = Math.max(...todos.map(el => el.id)) + 1;

    const newTodo = {
      completed: false,
      id: maxId,
      title: newTitile,
      user: getUser(+selectedId),
      userId: selectedId,
    };

    setTodos([...todos, newTodo]);

    setNewTitle('');
    setSelectedId('0');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={submitHandler}
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            onChange={titleHandler}
            value={newTitile}
            placeholder="Enter a title"
          />
          {noTitleError
            || (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            onChange={selectHandler}
            value={selectedId}
          >
            <option key={0} value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.name} value={user.id}>{user.name}</option>
            ))}
          </select>

          {noUserError
            || (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
