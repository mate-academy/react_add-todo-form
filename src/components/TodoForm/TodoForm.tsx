import React, { useState } from 'react';

import usersFromServer from '../../api/users';

import { User } from '../../types/User';
import { ToDo } from '../../types/ToDo';

type Props = {
  addTodo: (todo: ToDo) => void;
  todoList: ToDo[];
};

export const TodoForm: React.FC<Props> = ({ addTodo, todoList }) => {
  const [todoTitle, setTodoTitle] = useState('');
  const [todoUserId, setTodoUser] = useState(0);
  const [hasErrorTitle, setHasErrorTitle] = useState(false);
  const [hasErrorSelect, setHasErrorSelect] = useState(false);

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (todoTitle.trim() === '') {
      setHasErrorTitle(!hasErrorTitle);
    }

    if (todoUserId === 0) {
      setHasErrorSelect(!hasErrorSelect);
    }

    if (todoTitle.trim() === '' || todoUserId === 0) {
      return;
    }

    const newId = Math.max(...todoList.map((todo: ToDo) => todo.id));
    const getUserById = usersFromServer.find(user => user.id === todoUserId);

    addTodo({
      id: newId + 1,
      title: todoTitle,
      completed: false,
      userId: todoUserId,
      user: getUserById,
    });

    setTodoTitle('');
    setTodoUser(0);

    setHasErrorTitle(false);
    setHasErrorSelect(false);
  };

  const handlerTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(e.target.value);
    setHasErrorTitle(false);
  };

  const handlerSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTodoUser(+e.target.value);
    setHasErrorSelect(false);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={submitForm}>
      <div className="field">
        <label htmlFor="todo-title">Title: </label>
        <input
          id="todo-title"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={todoTitle}
          onChange={handlerTitle}
        />
        {hasErrorTitle && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="todo-select">User: </label>
        <select
          id="todo-select"
          data-cy="userSelect"
          value={todoUserId}
          onChange={handlerSelect}
        >
          <option value={0} disabled>
            Choose a user
          </option>

          {usersFromServer.map((user: User) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {hasErrorSelect && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
