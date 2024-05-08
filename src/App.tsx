import { useState } from 'react';

import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

export type ValidUser = User | null;

function getUserById(id: number): ValidUser {
  return usersFromServer.find(person => person.id === id) || null;
}

const todosWithUser: Todo[] = todosFromServer.map(todo => {
  return {
    ...todo,
    user: getUserById(todo.userId),
  };
});

export const App = () => {
  const [titleOfTodo, setTitleOfTodo] = useState('');
  const [currentUserId, setCurrentUserId] = useState(0);
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>(todosWithUser);

  const [hasTodoError, setHasTodoError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const resetForm = () => {
    setTitleOfTodo('');
    setCurrentUserId(0);
    setHasTodoError(false);
    setHasUserError(false);
  };

  const handleAddNewTodo = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setHasTodoError(!titleOfTodo);
    setHasUserError(!currentUserId);

    if (!titleOfTodo || currentUserId === 0) {
      return;
    }

    const newTodo: Todo = {
      id: visibleTodos.length + 1,
      title: titleOfTodo,
      completed: false,
      userId: currentUserId,
      user: getUserById(currentUserId),
    };

    setVisibleTodos(prevTodos => [...prevTodos, newTodo]);
    resetForm();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddNewTodo}>
        <div className="field">
          Title:
          <input
            type="text"
            data-cy="titleInput"
            value={titleOfTodo}
            placeholder="Enter the title"
            onChange={e => {
              setTitleOfTodo(e.target.value);
              if (hasTodoError) {
                setHasTodoError(false);
              }
            }}
          />
          {hasTodoError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          User:
          <select
            data-cy="userSelect"
            value={currentUserId}
            onChange={e => {
              setCurrentUserId(+e.target.value);
              if (hasUserError) {
                setHasUserError(false);
              }
            }}
            required
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {hasUserError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={visibleTodos} />
    </div>
  );
};
