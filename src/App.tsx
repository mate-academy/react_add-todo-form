import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/interface';
import { TodoList } from './components/TodoList';

function getUserByName(nameUser: string) {
  return usersFromServer.find(({ name }) => name === nameUser) || null;
}

function getUserById(userId: number) {
  return usersFromServer.find(({ id }) => id === userId) || null;
}

const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userSelect, setUserSelect] = useState('');
  const [visibleTodos, addTodo] = useState(todos);
  const [showOnStart, setShowOnStart] = useState(false);

  const newId = Math.max(...visibleTodos.map(({ id }) => id)) + 1;

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowOnStart(true);
    if (title.trim() && userSelect) {
      const user = getUserByName(userSelect);
      const todo = {
        id: newId,
        title,
        completed: false,
        userId: user?.id,
      };

      const newTodo = {
        ...todo,
        user,
      };

      addTodo(state => [...state, newTodo]);
      setUserSelect('');
      setTitle('');
      setShowOnStart(false);
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
          <label>
            <span>Titile: </span>
            <input
              type="text"
              data-cy="titleInput"
              placeholder="EnterTitle"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </label>

          {(showOnStart && !title)
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            <span>User: </span>
            <select
              data-cy="userSelect"
              value={userSelect}
              onChange={(event) => setUserSelect(event.target.value)}
            >
              <option value="">Choose a user</option>
              {usersFromServer.map(({ name, id }) => (
                <option value={name} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </label>

          {(showOnStart && !userSelect)
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList visibleTodos={visibleTodos} />
    </div>
  );
};
