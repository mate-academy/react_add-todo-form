import { SetStateAction, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleTitleChange = (event:
  { target: { value: SetStateAction<string>; }; }) => {
    setTitle(event.target.value);
    if (titleError) {
      setTitleError('');
    }
  };

  const handleUserChange = (event:
  { target: { value: SetStateAction<string>; }; }) => {
    setUserId(event.target.value);
    if (userError) {
      setUserError('');
    }
  };

  const addTodo = () => {
    const newTodo = {
      id: todos.length + 1,
      title,
      userId: Number(userId),
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTitle('');
    setUserId('');
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();

    if (!title.trim()) {
      setTitleError('Please enter a title');

      return;
    }

    if (!userId) {
      setUserError('Please choose a user');

      return;
    }

    addTodo();
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form onSubmit={handleSubmit}>
        <div className="field">
          Title: &nbsp;
          <input
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          User:&nbsp;
          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>

          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;
