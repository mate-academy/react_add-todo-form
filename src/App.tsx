import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

import { User } from './types/User';
import { Todo } from './types/Todo';
import { TodoList } from './components/TodoList';

function getUser(userId: number): User | null {
  const foundUser = usersFromServer.find(user => user.id === userId);

  return foundUser || null;
}

export const todos: Todo[] = todosFromServer.map(todo => ({
  ...todo,
  user: getUser(todo.userId),
}));

const maxId = Math.max(...todosFromServer.map(todo => todo.id));

export const App: React.FC = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    userId: '',
  });
  const [newTodos, setNewTodos] = useState(todos);
  const [isTitle, setIsTitle] = useState(true);
  const [isUser, setIsUser] = useState(true);

  const handleTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const filteredValue = value.replace(/[^a-zа-яё\d\s]/ig, '');

    setFormValues(prevValues => ({
      ...prevValues,
      title: filteredValue,
    }));

    setIsTitle(!!filteredValue.trim());
  };

  const handleGetUserId = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFormValues(prevValues => ({
      ...prevValues,
      userId: event.target.value,
    }));
    setIsUser(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();
    const newMaxId = maxId + 1;
    const { title, userId } = formValues;

    setIsTitle(!!title.trim());
    setIsUser(!!userId);

    if (title.trim() && userId) {
      setNewTodos([
        ...newTodos,
        {
          id: newMaxId,
          userId: Number(userId),
          title,
          completed: false,
          user: getUser(Number(userId)),
        },
      ]);

      setFormValues({
        title: '',
        userId: '',
      });
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          {'Title: '}
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={formValues.title}
            onChange={handleTitle}
          />
          {!isTitle && (<span className="error">Please enter a title</span>)}
        </div>

        <div className="field">
          {'User: '}
          <select
            data-cy="userSelect"
            value={formValues.userId}
            onChange={handleGetUserId}
          >
            <option value="0">Choose a user</option>

            {usersFromServer.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>

          {!isUser && (<span className="error">Please choose a user</span>)}
        </div>

        <button type="submit" data-cy="submitButton">Add</button>
      </form>

      <TodoList todos={newTodos} />
    </div>
  );
};
