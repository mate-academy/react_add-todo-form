import { useState, FormEvent } from 'react';
import usersFromServer from './api/users';
import { TodoList } from './components/TodoList';
import { TodoItem } from './types';
import './App.scss';

export const App = () => {
  const [title, setTitle] = useState('');
  const [selectedUser, setSelectedUser] = useState('');
  const [titleTouched, setTitleTouched] = useState(false);
  const [userTouched, setUserTouched] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setTitleTouched(true);
    setUserTouched(true);

    if (!title.trim() || !selectedUser) {
      return;
    }

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
    };

    setTitle('');
    setSelectedUser('');
    setTitleTouched(false);
    setUserTouched(false);
    setTodos([...todos, newTodo]);
    setSubmitted(false);
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
          {titleTouched && !title.trim() && (
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
          {userTouched && !selectedUser && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todos} submitted={submitted} />
    </div>
  );
};
