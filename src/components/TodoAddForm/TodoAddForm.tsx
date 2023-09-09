import { useState } from 'react';
import { PreparedTodo } from '../../types/PreparedTodo';
import { User } from '../../types/User';
import './TodoAddForm.scss';

interface Props {
  todos: PreparedTodo[],
  users: User[],
  onAdd: (todo: PreparedTodo) => void,
}

export const TodoAddForm: React.FC<Props> = ({ todos, users, onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserIdValid, setIsUserIdValid] = useState(true);

  const validatorABC = /[^a-zA-Zа-яА-Я0-9\s]/g;

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(validatorABC, ''));
    setIsTitleValid(true);
  };

  const handleUserIdInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserIdValid(true);
  };

  const reset = () => {
    setTitle('');
    setUserId(0);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!(title.length)) {
      setIsTitleValid(false);
    }

    if (!userId) {
      setIsUserIdValid(false);
    }

    if (title.length && userId) {
      const todoId = todos.reduce((acc, todo) => Math.max(acc, todo.id), 0);

      onAdd({
        id: todoId + 1,
        title,
        completed: false,
        userId,
        user: users
          .find((user: User) => user.id === userId) ?? undefined,
      });

      reset();
    }
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={onSubmit}
    >
      <div className="field">
        <input
          id="title"
          type="text"
          data-cy="titleInput"
          value={title}
          placeholder="Enter a title"
          onChange={handleTitleInput}
        />

        {!isTitleValid && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <select
          id="userId"
          data-cy="userSelect"
          value={userId}
          onChange={handleUserIdInput}
        >
          <option value="0" disabled>Choose a user</option>
          {users.map((user: User) => (
            <option
              value={user.id}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>

        {!isUserIdValid && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
