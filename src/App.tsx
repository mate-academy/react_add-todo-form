import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { ToDo } from './types/ToDo';
import './App.scss';

export const App: React.FC = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);
  const [todos, setTodos] = useState<ToDo[]>(todosFromServer.map(todo => ({
    ...todo,
    user: usersFromServer.find(user => user.id === todo.userId) || null,
  })));

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setIsTitleError(true);
      isValid = false;
    }

    if (!userId) {
      setIsUserError(true);
      isValid = false;
    }

    return isValid;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    event.preventDefault();

    if (event.target.name === 'title') {
      setTitle(event.target.value);
      setIsTitleError(false);
    } else if (event.target.name === 'select') {
      setUserId(+event.target.value);
      setIsUserError(false);
    }
  };

  const handleAddToDo = (
    event: React.FormEvent
  ) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const newTodo: ToDo = {
      id: Math.max(...todos.map(todo => todo.id)) + 1,
      userId,
      title,
      completed: false,
      user: usersFromServer.find(user => userId === user.id) || null,
    };

    setTodos(prevTodos => [...prevTodos, newTodo]);

    setTitle('');
    setUserId(0);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleAddToDo}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            id="title"
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            name="title"
            value={title}
            onChange={handleChange}
          />
          {isTitleError && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            name='select'
            value={userId}
            onChange={handleChange}
          >
            <option value="0" defaultChecked>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {isUserError && (
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
