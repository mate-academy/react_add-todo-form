import React, { useState } from 'react';
import usersFromServer from '../../api/users';

interface TodoFormProps {
  onAddTodo: (title: string, userId: number) => void;
}

export const TodoForm: React.FC<TodoFormProps> = ({ onAddTodo }) => {
  const [userSelectId, setUserSelectId] = useState(0);
  const [todoTitle, setTodoTitle] = useState('');
  const [errorUserSelectId, setErrorUserSelectId] = useState(false);
  const [errorTodoTitle, setErrorTodoTitle] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userSelectId === 0) {
      setErrorUserSelectId(true);
    }

    if (todoTitle === '') {
      setErrorTodoTitle(true);
    }

    if (userSelectId === 0 || todoTitle === '') {
      return;
    }

    onAddTodo(todoTitle, userSelectId);
    setUserSelectId(0);
    setTodoTitle('');
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/[^a-zA-Z0-9 ]/g, '');

    setTodoTitle(value);
    setErrorTodoTitle(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter todo title"
          value={todoTitle}
          onChange={handleTitleChange}
        />
        {errorTodoTitle && <span className="error">Please enter a title</span>}
      </div>
      <div className="field">
        <select
          data-cy="userSelect"
          value={userSelectId}
          onChange={event => {
            setUserSelectId(Number(event.target.value));
            setErrorUserSelectId(false);
          }}
        >
          <option value={0} disabled>
            Choose a user
          </option>
          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        {errorUserSelectId && (
          <span className="error">Please choose a user</span>
        )}
      </div>
      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
