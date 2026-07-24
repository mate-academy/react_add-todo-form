import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList/TodoList';
import { useState } from 'react';

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState<number>(0);

  const [hasTitleError, setHasTitleError] = useState(false);
  const [hasUserError, setHasUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const sanitizedTitle = event.target.value.replace(
      /[^a-zA-Zа-яА-ЯіІїЇєЄґҐ0-9 ]/g,
      '',
    );

    setTitle(sanitizedTitle);
    setHasTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setHasUserError(false);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const isTitleValid = title.trim().length > 0;
    const isUserValid = userId !== 0;

    setHasTitleError(!isTitleValid);
    setHasUserError(!isUserValid);

    if (!isTitleValid || !isUserValid) {
      return;
    }

    const maxId = todos.length > 0 ? Math.max(...todos.map(t => t.id)) : 0;
    const newId = maxId + 1;

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId,
      completed: false,
      user: getUserById(userId),
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId(0);
    setHasTitleError(false);
    setHasUserError(false);
  };

  return (
    <>
      <div className="App">
        <h1>Add todo form</h1>

        <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="todo-title">Title</label>
            <input
              id="todo-title"
              type="text"
              data-cy="titleInput"
              placeholder="Enter title"
              value={title}
              onChange={handleTitleChange}
            />

            {hasTitleError && (
              <span className="error">Please enter a title</span>
            )}
          </div>

          <div className="field">
            <label htmlFor="todo-user">User</label>
            <select
              id="todo-user"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserChange}
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

            {hasUserError && (
              <span className="error">Please choose a user</span>
            )}
          </div>

          <button type="submit" data-cy="submitButton">
            Add
          </button>
        </form>
        <section className="TodoList">
          <TodoList todos={todos} />
        </section>
      </div>
    </>
  );
};
