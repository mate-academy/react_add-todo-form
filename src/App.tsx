import { useState, FormEvent } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import { TodoItem } from './types';
import './App.scss';

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (title.trim() && selectedUser) {
      const newUser = usersFromServer.find(
        user => user.id === Number(selectedUser),
      );

      if (!newUser) {
        return;
      }

      const newTodo = {
        id: Math.random(),
        title,
        completed: false,
        user: newUser,
        submitted: false,
      };

      setTitle('');
      setSelectedUser('');
      setSubmitted(true);
      setTodos([...todos, newTodo]);
    }
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          Title:&nbsp;&nbsp;
          <input
            id="title"
            value={title}
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            onChange={e => setTitle(e.target.value)}
          />
          {submitted && !title.trim() && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:&nbsp;&nbsp;
          <select
            data-cy="userSelect"
            id="user"
            value={selectedUser}
            onChange={e => setSelectedUser(e.target.value)}
          >
            <option value="0">Choose a user</option>
            {usersFromServer.map(users => (
              <option key={users.id} value={users.id}>
                {users.name}
              </option>
            ))}
          </select>
          {submitted && !selectedUser && (
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
