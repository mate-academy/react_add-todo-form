import './App.scss';
import React, { useState } from 'react';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

const getUserByID = (userId: number): User | null => {
  const foundUser = usersFromServer.find(user => user.id === userId);

  // if there is no user with a given userId
  return foundUser || null;
};

export const todosMapped: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUserByID(todo.userId),
}));

export const App: React.FC = () => {
  const [titleNew, setTitle] = useState<string>('');
  const [userID, setUserID] = useState<string>('0');
  const [todos, setTodos] = useState<Todo[]>(todosMapped);
  const [titleError, setTitleError] = useState('');
  const [userError, setUserError] = useState('');

  const maxId = Math.max(...todosMapped.map(todo => todo.id));
  const addTodo = (formTitle: string, formUserId: string) => {
    if (titleNew.trim().length !== 0 && +formUserId > 0) {
      setTitle('');
      setUserID('0');
      const todo = {
        id: maxId + 1,
        title: formTitle,
        completed: false,
        userId: +formUserId,
        user: getUserByID(+formUserId),
      };

      setTodos([
        ...todos,
        todo,
      ]);
    }

    if (titleNew.trim().length === 0) {
      setTitleError('Please enter a title');
    }

    if (userID === '0') {
      setUserError('Please choose a user');
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setTitleError('');
  };

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserID(e.target.value);
    setUserError('');
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        onSubmit={e => e.preventDefault()}
      >
        <div className="field">
          <label htmlFor="title">
            Title: &nbsp;
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              name="title"
              value={titleNew}
              onChange={handleTitleChange}
            />
            {titleError
              && <span className="error">Please enter a title</span>}

          </label>
        </div>

        <div className="field">
          <label htmlFor="user">
            User: &nbsp;
            <select
              data-cy="userSelect"
              name="userID"
              value={userID}
              onChange={handleUserChange}
            >
              <option value="0" disabled>Choose a user</option>
              {usersFromServer.map((user) => (
                <option value={user.id} key={user.id}>{user.name}</option>
              ))}
            </select>
            {userError
              && <span className="error">Please choose a user</span>}
          </label>
        </div>

        <button
          type="submit"
          data-cy="submitButton"
          onClick={() => addTodo(titleNew, userID)}
        >
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
