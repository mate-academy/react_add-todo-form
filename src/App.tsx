import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

export type Todos = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
};

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User | null;
}

export const App = () => {
  const [newUser, setNewUser] = useState(0);
  const [newTitle, setNewTitle] = useState('');
  const [userValidation, setUserValidation] = useState(false);
  const [titleValidation, setTitleValidation] = useState(false);
  const [highestId, setHighestId] = useState(
    Math.max(...todosFromServer.map(todo => todo.id), 0) + 1,
  );
  const [visibleTodos, setVisibleTodos] = useState([...todosFromServer]);

  // Add user to todo item
  function addUserTodo(todos: Todos[]) {
    return todos.map(todo => ({
      ...todo,
      user: usersFromServer.find(user => user.id === todo.userId) || null,
    }));
  }

  const isUserInvalid = newUser === 0;
  const isTitleInvalid = newTitle.trim().replace(/[^a-zA-Zа0-9 ]/g, '') === '';

  function handleSubmit(
    inputUser: number,
    inputTitle: string,
    event: React.FormEvent,
  ) {
    event.preventDefault();

    setTitleValidation(isTitleInvalid);
    setUserValidation(isUserInvalid);

    if (isUserInvalid || isTitleInvalid) {
      return;
    }

    const newTodo = {
      id: highestId,
      completed: false,
      title: inputTitle.trim().replace(/[^a-zA-Zа0-9 ]/g, ''),
      userId: inputUser,
    };

    setVisibleTodos([...visibleTodos, newTodo]);
    setHighestId(highestId + 1);
    setNewTitle('');
    setNewUser(0);
  }

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={event => handleSubmit(newUser, newTitle, event)}>
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            placeholder="Enter your title"
            value={newTitle}
            onChange={event => {
              const value = event.target.value;

              setNewTitle(value);
              setTitleValidation(value.trim() === '');
            }}
          />
          {titleValidation && (
            <span className="error">Please enter a title</span>
          )}
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={newUser}
            onChange={event => {
              const value = +event.target.value;

              setNewUser(value);
              setUserValidation(value === 0);
            }}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {userValidation && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={addUserTodo(visibleTodos)} />
      </section>
    </div>
  );
};
