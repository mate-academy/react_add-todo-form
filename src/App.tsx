import { useState } from 'react';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import './App.scss';

const getUser = (userId: number): User => usersFromServer
  .find(user => user.id === userId) ?? { id: 0, name: '', email: '' };

const todoList = todosFromServer.map(todo => (
  { ...todo, user: getUser(todo.userId) }));

export const App = () => {
  const [todos, setTodos] = useState(todoList);
  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isValid = /^[a-zA-Z0-9а-яА-Я\s]*$/.test(event.target.value);

    setTitleError(!isValid);

    return isValid && setTitle(event.target.value);
  };

  const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserError(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = title.trim();

    setTitleError(!trimmedTitle);
    setUserError(!userId);

    if (trimmedTitle && userId) {
      const newTodo: Todo = {
        id: Math.max(...todos.map(todo => todo.id)) + 1,
        title: trimmedTitle,
        userId,
        user: getUser(userId),
        completed: false,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUserId(0);
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            id="titleInput"
            name="title"
            value={title}
            onChange={handleTitleChange}
            data-cy="titleInput"
            placeholder="Enter a title"
          />
          {titleError && <span className="error">Please enter a title</span>}
        </div>
        <div className="field">
          <select
            id="userSelect"
            name="user"
            value={userId}
            onChange={handleUserChange}
            data-cy="userSelect"
          >
            <option value={0} disabled>
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
