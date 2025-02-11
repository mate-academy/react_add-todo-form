import './App.scss';
import { useState, useEffect } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { TodoList } from './components/TodoList';

const todosWithUsers = todosFromServer.map(todo => {
  const newUser = usersFromServer.find(user => user.id === todo.userId);

  return {
    ...todo,
    user: newUser || null,
  };
});

export const App = () => {
  const [inputText, setInputText] = useState('');
  const [id, setId] = useState(0);
  const [allTodos, setAllTodos] = useState(todosWithUsers);
  const [isVisibleUser, setIsVisibleUser] = useState(false);
  const [isVisibleTitle, setIsVisibleTitle] = useState(false);

  useEffect(() => {
    if (id) {
      setIsVisibleUser(false);
    }

    if (inputText.trim()) {
      setIsVisibleTitle(false);
    }
  }, [id, inputText]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id) {
      setIsVisibleUser(true);
    } else {
      setIsVisibleUser(false);
    }

    if (!inputText.trim()) {
      setIsVisibleTitle(true);
    } else {
      setIsVisibleTitle(false);
    }

    if (id && inputText.trim()) {
      const newTodo = {
        id: Math.max(...allTodos.map(t => t.id)) + 1,
        title: inputText,
        completed: false,
        userId: id,
        user: usersFromServer.find(person => person.id === id) || null,
      };

      setAllTodos(prev => [...prev, newTodo]);

      setId(0);
      setInputText('');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
        <div className="field">
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Please enter a title"
            value={inputText}
            onChange={event => setInputText(event.currentTarget.value)}
          />

          {isVisibleTitle && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={id}
            onChange={event => {
              setId(+event.currentTarget.value);
            }}
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

          {isVisibleUser && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={allTodos} />
    </div>
  );
};
