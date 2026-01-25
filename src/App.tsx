import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { Todo } from './types';

// Prepare initial todos with user objects
const initialTodos: Todo[] = todosFromServer.map(todo => {
  const user = usersFromServer.find(userItem => userItem.id === todo.userId);

  return {
    ...todo,
    user: user || usersFromServer[0],
  };
});

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const isTitleEmpty = title.trim() === '';
    const isUserNotSelected = userId === 0;

    setTitleError(isTitleEmpty);
    setUserError(isUserNotSelected);

    if (isTitleEmpty || isUserNotSelected) {
      return;
    }

    const user = usersFromServer.find(userItem => userItem.id === userId);

    if (!user) {
      return;
    }

    const maxId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) : 0;
    const newTodo: Todo = {
      id: maxId + 1,
      title: title.trim(),
      completed: false,
      userId,
      user,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId(0);
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(Number(event.target.value));
    setUserError(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter todo title"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0">Choose a user</option>
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
