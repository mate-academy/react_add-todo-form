import React, { useState } from 'react';
import './App.css';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { FullTodo, Todo, User } from './react-app-env';
import TodoList from './components/TodoList/TodoList';

const App: React.FC = () => {
  const [newUser, setNewUser] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newCompleted, setNewCompleted] = useState(false);
  const [newTodo, setNewTodo] = useState(todosFromServer);
  const [isUserSet, setIsUserSet] = useState(true);
  const [isTitleSet, setIsTitleSet] = useState(true);

  const preparedTodos = (
    todos: Todo[],
    users: User[],
  ): FullTodo[] => {
    return todos.map(todo => ({
      ...todo,
      user: users.find(user => user.id === todo.userId) || null,
    }));
  };

  const todos = preparedTodos(
    newTodo,
    usersFromServer,
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!newUser && !newTitle) {
      setIsUserSet(false);
      setIsTitleSet(false);

      return;
    }

    if (!newUser) {
      setIsUserSet(false);

      return;
    }

    if (!newTitle) {
      setIsTitleSet(false);

      return;
    }

    setNewTodo([...newTodo, {
      userId: +newUser,
      id: newTodo.length + 1,
      title: newTitle,
      completed: newCompleted,
    }]);

    setNewTitle('');
    setNewCompleted(false);
    setNewUser('');
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="titleInput" className="mt-2">Title: </label>
        <input
          type="text"
          id="titleInput"
          className="input is-link level level-left column is-2 mb-1"
          value={newTitle}
          onChange={(event) => {
            setIsTitleSet(true);
            setNewTitle(event.target.value);
          }}
        />
        {!isTitleSet && (
          <div className="label has-text-link">Please enter title!</div>
        )}

        <select
          name="user"
          id="selectUser"
          className="select is-link level mb-1"
          value={newUser}
          onChange={(event) => {
            setIsUserSet(true);
            setNewUser(event.target.value);
          }}
        >
          <option
            value=""
            disabled
            selected
          >
            Choose user
          </option>
          {usersFromServer.map(user => (
            <option value={user.id} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {!isUserSet && (
          <label
            htmlFor="selectUser"
            className="label has-text-link"
          >
            Please choose user!
          </label>
        )}

        <label htmlFor="completed">
          <input
            type="checkbox"
            name="newCompleted"
            className="checkbox mt-2 mb-3 mr-1"
            id="completed"
            checked={newCompleted}
            onChange={() => setNewCompleted(!newCompleted)}
          />
          Completed
        </label>

        <button
          type="submit"
          className="button is-link level level-left"
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};

export default App;
