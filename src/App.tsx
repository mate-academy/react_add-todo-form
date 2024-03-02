import './App.scss';
import { useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

let biggestId = 0;

usersFromServer.forEach(user => {
  if (user.id > biggestId) {
    biggestId = user.id;
  }
});

export const App = () => {
  const [todos, setTodos] = useState(todosFromServer);
  const [input, setInput] = useState('');
  const [newId, setNewid] = useState(biggestId + 1);
  const [currentUserId, setCurrentUserId] = useState(0);
  const [touched, setTouched] = useState({
    title: false,
    user: false,
  });
  const [selectedValue, setSelectedValue] = useState(0);

  const isDisabled = !(currentUserId && input.trim());

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setTodos(prevTodos => {
      return [
        ...prevTodos,
        {
          id: newId,
          title: input,
          completed: false,
          userId: currentUserId,
        },
      ];
    });

    setNewid(newId + 1);
    setCurrentUserId(0);
    setTouched({ title: false, user: false });
    setInput('');
    setSelectedValue(0);
  };

  const handleCurrentUserId = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserId(+e.currentTarget.value);
    setSelectedValue(+e.currentTarget.value);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          Title:&nbsp;&nbsp;
          <input
            type="text"
            value={input}
            data-cy="titleInput"
            placeholder="Enter a title"
            required
            onChange={handleInput}
            onBlur={() => setTouched(prev => ({ ...prev, title: true }))}
          />
          {touched.title && !input.trim() && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          User:&nbsp;
          <select
            data-cy="userSelect"
            value={selectedValue}
            onChange={handleCurrentUserId}
            required
            onBlur={() => setTouched(prev => ({ ...prev, user: true }))}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id}>{user.name}</option>
            ))}
          </select>
          {touched.user && currentUserId === 0 && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton" disabled={isDisabled}>
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
