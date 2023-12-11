import { FC, FormEvent, useState } from 'react';

import users from '../../api/users';

import './TodoForm.scss';
import { getUser } from '../../functions/getUser';
import { TodoFormProps } from '../../types/TodoFormTypes';

export const TodoForm: FC<TodoFormProps> = ({ onSubmit, newTodoId }) => {
  const [chosenUserId, setChosenUser] = useState<string>('0');
  const [todoTitle, setTodoTitle] = useState<string>('');
  const [submitTried, setSubmitTried] = useState<boolean>(false);

  const setDefaultState = () => {
    setChosenUser('0');
    setTodoTitle('');
    setSubmitTried(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedUserId = Number(chosenUserId);

    if (!todoTitle || !selectedUserId) {
      setSubmitTried(true);

      return;
    }

    const todo = {
      id: newTodoId,
      title: todoTitle,
      completed: false,
      userId: selectedUserId,
      user: getUser(users, selectedUserId),
    };

    setDefaultState();

    onSubmit(todo);
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          placeholder="Enter a title"
          value={todoTitle}
          onChange={(event) => setTodoTitle(event.target.value)}
        />
        {!todoTitle && submitTried
        && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          value={chosenUserId}
          onChange={(event) => setChosenUser(event.target.value)}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map((user) => (
            <option value={user.id} key={user.id}>{user.name}</option>
          ))}
        </select>

        {chosenUserId === '0' && submitTried
        && <span className="error">Please choose a user</span>}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
      >
        Add
      </button>
    </form>
  );
};
