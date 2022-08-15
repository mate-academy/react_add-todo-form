import { useState } from 'react';
import './App.scss';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUserById(userId: number): User | null {
  return usersFromServer.find(user => user.id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [newTodos, setNewTodos] = useState(todos);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorSelect, setErrorSelect] = useState(false);

  const allTodosIds = [...todos].map(el => el.id);
  const newId = Math.max(...allTodosIds) + 1;
  const newUser = getUserById(selectedUserId);

  const createNewTodo = () => {
    return {
      id: newId,
      title,
      completed: false,
      userId: selectedUserId,
      user: newUser,
    };
  };

  const newTodo = createNewTodo();

  const addNewTodo = () => {
    return setNewTodos([
      ...newTodos,
      newTodo,
    ]);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.length === 0) {
      setErrorTitle(true);
    }

    if (selectedUserId === 0) {
      setErrorSelect(true);
    }

    if (title.length > 0
      && selectedUserId !== 0) {
      addNewTodo();
      setSelectedUserId(0);
      setTitle('');
      setErrorTitle(false);
      setErrorSelect(false);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={handleSubmit}
        action="/api/users"
        method="POST"
      >
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
          {(errorTitle && title.length === 0)
            && (<span className="error">Please enter a title</span>)}

        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            name="user"
            value={selectedUserId}
            onChange={(event) => setSelectedUserId(Number(event.target.value))}
          >

            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}

          </select>
          {(errorSelect && selectedUserId === 0)
            && (
              <span className="error">Please choose a user</span>
            ) }

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
