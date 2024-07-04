import { useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [newTodo, setNewTodo] = useState<Todo>({
    id: Math.max(...todos.map(todo => todo.id)) + 1,
    title: '',
    completed: false,
    userId: 0,
  });

  const [isTitleError, setIsTitleError] = useState(false);
  const [isSelectError, setIsSelectError] = useState(false);

  function handleTitleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setNewTodo(currentNewTodo => ({
      ...currentNewTodo,
      title: e.target.value,
    }));

    setIsTitleError(false);
  }

  function handleSelectUser(e: React.ChangeEvent<HTMLSelectElement>) {
    setNewTodo(currentNewTodo => ({
      ...currentNewTodo,
      userId: +e.target.value,
    }));

    setIsSelectError(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!newTodo.title) {
      setIsTitleError(true);
    }

    if (!newTodo.userId) {
      setIsSelectError(true);
    }

    if (!newTodo.title || !newTodo.userId) {
      return;
    }

    setTodos(currentTodos => [...currentTodos, newTodo]);

    setNewTodo({
      id: +Math.random().toFixed(4).slice(2),
      title: '',
      completed: false,
      userId: 0,
    });
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={newTodo.title}
            onChange={handleTitleChange}
          />
          {isTitleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={newTodo.userId}
            onChange={handleSelectUser}
          >
            <option value="0" defaultChecked disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isSelectError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
