import { useState } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { Todo } from './types';
import { TodoList } from './components/TodoList';

const initialTodos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: usersFromServer.find(user => user.id === todo.userId)!,
}));

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = event.target.value.replace(
      /[^a-zA-ZА-ЯҐЄІЇа-яґєії0-9 ]/g,
      '',
    );

    setTitle(filtered);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasTitleError = !title.trim();
    const hasUserError = !userId;

    setTitleError(hasTitleError);
    setUserError(hasUserError);

    if (hasTitleError || hasUserError) {
      return;
    }

    const newId = Math.max(...todos.map(todo => todo.id)) + 1;
    const selectedUser = usersFromServer.find(user => user.id === userId)!;

    const newTodo: Todo = {
      id: newId,
      title: title.trim(),
      userId,
      completed: false,
      user: selectedUser,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            id="userSelect"
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
          {userError && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
