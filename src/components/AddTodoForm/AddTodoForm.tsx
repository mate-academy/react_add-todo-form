import React, { useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onAddTodo: (newTodo: Todo) => void;
  currentTodos: Todo[];
};

export const AddTodoForm: React.FC<Props> = ({
  users,
  onAddTodo,
  currentTodos,
}) => {
  const [title, setTitle] = useState('');
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorUser, setErrorUser] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!title.trim()) {
      setErrorTitle(true);
      isValid = false;
    } else {
      setErrorTitle(false);
    }

    if (selectedUserId <= 0) {
      setErrorUser(true);
      isValid = false;
    } else {
      setErrorUser(false);
    }

    return isValid;
  };

  const getNextTodoId = (todos: Todo[]): number => {
    if (todos.length === 0) {
      return 1;
    }

    return (
      todos.reduce((maxId, todo) => (todo.id > maxId ? todo.id : maxId), 0) + 1
    );
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newTodo: Todo = {
      id: getNextTodoId(currentTodos),
      title: title.trim(),
      completed: false,
      userId: selectedUserId,
      user: users.find(user => user.id === selectedUserId)!,
    };

    onAddTodo(newTodo);
    setTitle('');
    setSelectedUserId(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="titleInput">Title: </label>
        <input
          id="titleInput"
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={title}
          onChange={event => {
            setTitle(event.target.value);

            if (errorTitle) {
              setErrorTitle(false);
            }
          }}
        />
        {errorTitle && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label htmlFor="userSelect">User: </label>
        <select
          data-cy="userSelect"
          id="userSelect"
          value={selectedUserId}
          onChange={event => {
            setSelectedUserId(+event.target.value);
            if (errorUser) {
              setErrorUser(false);
            }
          }}
        >
          <option value="0" disabled>
            Choose a user
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {errorUser && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
