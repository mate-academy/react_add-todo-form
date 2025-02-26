import React, { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';
import { ITodo } from './interfaces/ITodo';
import { INewTodo } from './interfaces/INewTodo';

export const App = () => {
  function findUserById(id: number) {
    return usersFromServer.find(user => user.id === id);
  }

  const todosWithUsers = todosFromServer.map(todo => ({
    ...todo,
    user: findUserById(todo.userId),
  }));
  const [selectedUser, setSelectedUser] = useState('0');
  const [todos, setTodos] = useState<ITodo[]>([...todosWithUsers]);
  const [title, setTitle] = useState('');
  const [isTitleEmpty, setIsTitleEmpty] = useState(true);
  const [isUserEmpty, setIsUserEmpty] = useState(true);

  function onCheck(input: string): void {
    if (input === 'title') {
      if (title.trim().length > 0) {
        setIsTitleEmpty(false);
      } else {
        setIsTitleEmpty(true);
      }
    } else if (input === 'user') {
      if (selectedUser !== '0') {
        setIsUserEmpty(false);
      } else {
        setIsUserEmpty(true);
      }
    }
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const user = findUserById(Number(selectedUser));

    if (!user) {
      return;
    }

    const newId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
    const newTodo: INewTodo = {
      id: newId,
      title: title,
      completed: false,
      userId: user.id,
      user,
    };

    if (!isTitleEmpty && !isUserEmpty) {
      setTodos(prev => [...prev, newTodo]);
      setTitle('');
      setSelectedUser('0');
      onCheck('title');
      onCheck('user');
    }
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form action="/api/todos" method="POST" onSubmit={onSubmit}>
        <div className="field">
          <input
            type="text"
            onChange={e => {
              setTitle(e.target.value);
              setIsTitleEmpty(e.target.value.trim().length === 0);
            }}
            data-cy="titleInput"
            value={title}
            placeholder="Title"
            onBlur={() => onCheck('title')}
          />
          {isTitleEmpty && <span className="error">Please enter a title</span>}
        </div>

        <div className="field">
          <select
            data-cy="userSelect"
            value={selectedUser}
            onChange={e => {
              setSelectedUser(e.target.value);
              setIsUserEmpty(e.target.value === '0');
            }}
            onBlur={() => onCheck('user')}
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
          {isUserEmpty && <span className="error">Please choose a user</span>}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>
      <TodoList todos={todos} />
    </div>
  );
};
