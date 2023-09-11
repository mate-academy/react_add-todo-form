import { FormEventHandler, useState } from 'react';
import './App.scss';
import { TodoList } from './components/TodoList/TodoList';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User, Todo } from './types';

function getUser(userId: number): User {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser as User;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

export const App = () => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState('0');
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');
  const [todoList, setTodoList] = useState(todos);

  const handleNewTitle: React.ChangeEventHandler<HTMLInputElement>
  = (event) => {
    setTitleError('');

    return setTitle(event.target.value);
  };

  const handleUserChange: React.ChangeEventHandler<HTMLSelectElement>
  = (event) => {
    setUserError('');

    return setUserId(event.target.value);
  };

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();

    if (!title) {
      setTitleError('Please enter a title');
    }

    if (userId === '0') {
      setUserError('Please choose a user');
    }

    if (title && userId !== '0') {
      const findMaxId = Math.max(...todoList.map(todo => todo.id), 0);
      const todo: Todo = {
        id: findMaxId + 1,
        title,
        userId: +userId,
        completed: false,
        user: getUser(+userId),
      };

      setTodoList([...todoList, todo]);

      setTitle('');
      setUserId('0');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>
      <form
        action="/api/todos"
        method="POST"
        onSubmit={handleSubmit}
      >
        <div className="field">
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            data-cy="titleInput"
            id="title"
            value={title}
            onChange={handleNewTitle}
            placeholder="Enter a title"
          />
          <span className="error">{titleError}</span>
        </div>

        <div className="field">
          <label htmlFor="user">User: </label>
          <select
            data-cy="userSelect"
            id="user"
            value={userId}
            onChange={handleUserChange}
          >
            <option value="0" disabled>Choose a user</option>
            {usersFromServer.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <span className="error">{userError}</span>
        </div>
        <button
          type="submit"
          data-cy="submitButton"
        >
          Add
        </button>
      </form>

      <section className="TodoList">
        <TodoList todos={todoList} />
      </section>
    </div>
  );
};
