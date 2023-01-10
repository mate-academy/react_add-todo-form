import './App.scss';
import { FormEvent, useState } from 'react';
import { TodoList } from './components/TodoList';
import { User } from './types/User';
import { Todo } from './types/Todo';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

const todosWithUser: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(todosWithUser);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const [newTitle, setNewTitle] = useState('');
  const [idForUser, setIdForUser] = useState(0);

  const addTodo = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
    setNewTitle('');
    setIdForUser(0);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    setHasTitleError(!newTitle);
    setHasUserError(!idForUser);

    if (newTitle && idForUser) {
      const newTodo: Todo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: newTitle,
        completed: false,
        userId: idForUser,
        user: getUser(idForUser),
      };

      addTodo(newTodo);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            name="title"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTitle}
            onChange={e => {
              setNewTitle(e.target.value);
              setHasTitleError(false);
            }}
          />

          {hasTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            name="user"
            value={idForUser}
            onChange={e => {
              setIdForUser(Number(e.target.value));
              setHasUserError(false);
            }}
          >
            <option value="0" disabled>Choose a user</option>

            {usersFromServer.map(currentUser => (
              <option
                value={currentUser.id}
                key={currentUser.id}
              >
                {currentUser.name}
              </option>
            ))}
          </select>

          {hasUserError && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
