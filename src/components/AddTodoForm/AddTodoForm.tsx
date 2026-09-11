import React, { useState } from 'react';
import { User } from '../../sourse/User';

type Props = {
  users: User[];
  onSubmit: (title: string, userId: number) => void;
};

export const AddTodoForm: React.FC<Props> = ({ users, onSubmit }) => {
  const [todo, setTodo] = useState<string>('');
  const [userId, setUserId] = useState<number>(0);

  const [isUserFormValid, setIsUserFormValid] = useState<boolean>(false);
  const [isTodoFormValid, setIsTodoFormValid] = useState<boolean>(false);

  const selectUserHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setIsUserFormValid(false);
  };

  const todoChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
    setIsTodoFormValid(false);
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isUser = userId !== 0;
    const isTodo = todo.trim() !== '';

    setIsUserFormValid(!isUser);
    setIsTodoFormValid(!isTodo);

    if (isUser && isTodo) {
      onSubmit(todo, userId);
      setTodo('');
      setUserId(0);
    }
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={submitHandler}>
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="What needs to be done?"
          value={todo}
          onChange={todoChangeHandler}
        />
        {isTodoFormValid && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          onChange={selectUserHandler}
          value={userId}
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

        {isUserFormValid && <span className="error">Please choose a user</span>}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

export const MemoAddTodoForm = React.memo(AddTodoForm);
