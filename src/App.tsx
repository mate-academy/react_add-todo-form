import './App.scss';

import { FormEventHandler, useState } from 'react';
import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';

import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [counter, setCounter] = useState(
    todosFromServer.reduce((max, todosArr) => (
      todosArr.id > max ? todosArr.id : max
    ), 0) + 1,
  );

  const [newTodo, setNewTodo] = useState({
    id: counter,
    userId: 0,
    title: '',
    completed: false,
    user: getUser(1),
  });

  const [isTitle, setIsTitle] = useState(true);
  const [isUser, setIsUser] = useState(true);

  const users = usersFromServer.map(user => (
    <option value={user.id} key={user.id}>{user.name}</option>
  ));

  const handleTitleChange = (title: string) => {
    setIsTitle(true);

    setNewTodo(prevState => ({
      ...prevState,
      title,
    }
    ));
  };

  const handleUserChange = (userId: string) => {
    setIsUser(true);
    setNewTodo(prevState => ({
      ...prevState,
      userId: Number(userId),
      user: getUser(Number(userId)),
    }
    ));
  };

  const reset = () => {
    setNewTodo(prevState => ({
      ...prevState,
      title: '',
      userId: 0,
    }));
  };

  const addUser: FormEventHandler = (event) => {
    event.preventDefault();

    setCounter(counter + 1);

    setNewTodo(prevState => ({
      ...prevState,
      id: counter,
    }
    ));

    if (newTodo.userId === 0) {
      setIsUser(false);
    } else {
      setIsUser(true);
    }

    if (newTodo.title.length > 0) {
      setIsTitle(true);
    } else {
      setIsTitle(false);
    }

    if (newTodo.userId > 0 && newTodo.title.length > 0) {
      todos.push(newTodo);
      reset();
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/users"
        method="POST"
        onSubmit={addUser}
      >
        <div className="field">
          <label htmlFor="title">
            Title:
          </label>
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Ender a title"
            id="title"
            value={newTodo.title}
            onChange={(event) => handleTitleChange(event.target.value)}
          />
          {!isTitle
          && (
            <span className="error">Please enter a title</span>
          )}

        </div>

        <div className="field">
          <label htmlFor="user">
            User:
          </label>
          <select
            data-cy="userSelect"
            id="user"
            onChange={(event) => handleUserChange(event.target.value)}
            defaultValue={0}
            value={newTodo.userId}
          >
            <option value="0" disabled>Choose a user</option>
            {users}
          </select>
          {!isUser
          && (
            <span className="error">Please choose a user</span>
          )}
        </div>

        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <TodoList todos={todos} />
    </div>
  );
};
