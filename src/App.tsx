import React, { useState, ChangeEvent, FormEvent } from 'react';
import './App.scss';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
}

export const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(todosFromServer);
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTitleError('');
    setUserError('');

    if (title.trim() === '') {
      setTitleError('Please enter a title');
    }

    if (selectedUser === '') {
      setUserError('Please choose a user');
    }

    if (title.trim() !== '' && selectedUser !== '') {
      const newId = Math.max(...todos.map((todo) => todo.id)) + 1;

      const newTodo: Todo = {
        id: newId,
        title: title.trim(),
        userId: Number(selectedUser),
        completed: false,
      };

      setTodos([...todos, newTodo]);

      setTitle('');
      setSelectedUser('');
    }
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError('');
  };

  const handleUserChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedUser(event.target.value);
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title:</label>
          <input
            type="text"
            id="titleInput"
            value={title}
            onChange={handleTitleChange}
            placeholder="Enter a title"
            data-cy="titleInput"
          />
          {titleError && <span className="error">{titleError}</span>}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User:</label>
          <select
            id="userSelect"
            value={selectedUser}
            onChange={handleUserChange}
            data-cy="userSelect"
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userError && <span className="error">{userError}</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        {todos.map((todo) => (
          <article
            key={todo.id}
            data-id={todo.id}
            className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
          >
            <h2 className="TodoInfo__title">{todo.title}</h2>
            <a
              className="UserInfo"
              href={`mailto:${usersFromServer.find((user) => user.id === todo.userId)?.email}`}
            >
              {usersFromServer.find((user) => user.id === todo.userId)?.name}
            </a>
          </article>
        ))}
      </section>
    </div>
  );
};

export default App;
