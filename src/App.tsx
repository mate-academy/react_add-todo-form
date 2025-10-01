import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [todos, setTodos] = useState(
    todosFromServer.map(todo => ({
      ...todo,
      user: usersFromServer.find(u => u.id === todo.userId),
    })),
  );
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserValid, setIsUserValid] = useState(true);

  const findUser = (id: number) => {
    return usersFromServer.find(userFind => userFind.id === id);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Improved validation with trim()
    const isTitleValidNow = title.trim().length > 0;
    const isUserValidNow = user.trim().length > 0;

    setIsTitleValid(isTitleValidNow);
    setIsUserValid(isUserValidNow);

    if (isTitleValidNow && isUserValidNow) {
      const userId = parseInt(user);
      const foundUser = findUser(userId);
      const maxId = todos.length ? Math.max(...todos.map(todo => todo.id)) : 0;
      const newTodo = {
        id: maxId + 1,
        title: title.trim(),
        completed: false,
        userId: foundUser?.id ?? 0,
        user: foundUser,
      };

      setTodos([...todos, newTodo]);
      setTitle('');
      setUser('');
    }
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
            value={title}
            onChange={event => {
              setTitle(event.target.value);
              setIsTitleValid(true);
            }}
            placeholder="Enter a title"
          />
          {!isTitleValid ? (
            <span className="error">Please enter a title</span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            value={user}
            onChange={event => {
              setUser(event.target.value);
              setIsUserValid(true);
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map(us => (
              <option key={us.id} value={us.id}>
                {us.name}
              </option>
            ))}
          </select>

          {!isUserValid ? (
            <span className="error">Please choose a user</span>
          ) : null}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todoList={todos} />
    </div>
  );
};
