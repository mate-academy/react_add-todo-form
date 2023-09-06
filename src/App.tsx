import './App.scss';

import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList/TodoList';
import { Todo } from './types/todo';
import { User } from './types';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

function getMaxTodoId(todos: Todo[]) {
  const todoIds = todos.map(({ id }) => id);

  return Math.max(...todoIds);
}

export const createTodos = () => (todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
})));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(createTodos());
  const [touched, setTouched] = useState({
    title: false,
    user: false,
  });
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setnewUserId] = useState(0);

  const onAdd = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTitle && newUserId) {
      setTouched({ title: true, user: false });

      return;
    }

    if (newTitle && !newUserId) {
      setTouched({ title: false, user: true });

      return;
    }

    if (!newTitle && !newUserId) {
      setTouched({ title: true, user: true });

      return;
    }

    onAdd({
      id: getMaxTodoId(todos) + 1,
      title: newTitle,
      completed: false,
      user: getUserById(newUserId),
    });

    setNewTitle('');
    setnewUserId(0);
    setTouched({ title: false, user: false });
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="#title">
            {'Title: '}
            <input
              id="title"
              type="text"
              data-cy="titleInput"
              value={newTitle}
              placeholder="Enter a title"
              onChange={(event) => setNewTitle(event.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, title: true }))}
            />
          </label>
          {(touched.title && !newTitle) && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="userSelect">
            {'User: '}
            <select
              id="userSelect"
              data-cy="userSelect"
              value={newUserId}
              onChange={(event) => setnewUserId(+event.target.value)}
              onBlur={() => setTouched(prev => ({ ...prev, user: true }))}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user: User) => (
                <option value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
          {(touched.user && !newUserId) && (
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

      <TodoList todos={todos} />
    </div>
  );
};
