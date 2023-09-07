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
  const [isEmpty, setIsEmpty] = useState(
    { title: false, newUser: false },
  );
  const [newTitle, setNewTitle] = useState('');
  const [newUserId, setnewUserId] = useState(0);

  const onAdd = (newTodo: Todo) => {
    setTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const handleSetTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.target.value);
    setIsEmpty((prev) => ({ ...prev, title: false }));
  };

  const handleSetUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setnewUserId(+event.target.value);
    setIsEmpty((prev) => ({ ...prev, newUser: false }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newTitle || !newUserId) {
      setIsEmpty(() => (
        { title: !newTitle, newUser: !newUserId }
      ));

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
    setIsEmpty(() => (
      { title: false, newUser: false }
    ));
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
              onChange={handleSetTitle}
            />
          </label>
          {(isEmpty.title) && (
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
              onChange={handleSetUser}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user: User) => (
                <option value={user.id}>{user.name}</option>
              ))}
            </select>
          </label>
          {(isEmpty.newUser) && (
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
