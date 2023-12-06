import React, { useState } from 'react';
import { addId } from './helpers';
import { Todos } from './types/types';
import { TodoList } from './components/TodoList';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';

const todos = todosFromServer.map(todo => {
  const user = usersFromServer.find(u => {
    return u.id === todo.userId;
  }) || null;

  return {
    ...todo,
    user,
  };
});

export const App: React.FC = () => {
  const [todosList, setTodosList] = useState<Todos[]>(todos);
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [isTitleEmpty, setIsTitleEmpty] = useState(false);
  const [isIdSelected, setIsIdSelected] = useState(false);

  const newTodo: Todos = {
    id: addId(todosList),
    title,
    completed: false,
    userId: selectedUserId,
    user: usersFromServer.find(user => {
      return user.id === selectedUserId;
    }) || null,
  };

  const handleValidation = () => {
    setIsTitleEmpty(!title);
    setIsIdSelected(!selectedUserId);
  };

  const clear = () => {
    setTitle('');
    setSelectedUserId(0);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    handleValidation();

    if (!title || !selectedUserId) {
      return;
    }

    setTodosList(prevTodosList => [...prevTodosList, newTodo]);
    clear();
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setIsTitleEmpty(false);
  };

  const handleSelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedUserId(+e.target.value);
    setIsIdSelected(false);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form
        action="/api/todos"
        method="POST"
        onSubmit={onSubmit}
      >
        <div className="field">
          <label>
            {'Title: '}
            <input
              type="text"
              data-cy="titleInput"
              placeholder="Enter a title"
              value={title}
              onChange={handleInput}
            />
          </label>
          {isTitleEmpty
            && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <label>
            {'User: '}
            <select
              data-cy="userSelect"
              value={selectedUserId}
              onChange={handleSelected}
            >
              <option value={0} disabled>Choose a user</option>
              {usersFromServer.map(user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ))}
            </select>
          </label>

          {isIdSelected
            && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todos={todosList} />
    </div>
  );
};
