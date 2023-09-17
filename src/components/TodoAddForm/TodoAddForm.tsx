import { useState } from 'react';
import { PreparedTodo } from '../../types/PreparedTodo';
import { User } from '../../types/User';
import './TodoAddForm.scss';

interface Props {
  todos: PreparedTodo[],
  users: User[],
  onAdd: (todo: PreparedTodo) => void,
}

const validatorABC = /[^a-zA-Zа-яА-Я0-9\s]/g;

export const TodoAddForm: React.FC<Props> = ({ todos, users, onAdd }) => {
  const [title, setTitle] = useState('');
  const [userId, setUserId] = useState(0);

  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserIdValid, setIsUserIdValid] = useState(true);

  const handleTitleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.replace(validatorABC, ''));
    setIsTitleValid(true);
  };

  const handleUserIdInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserIdValid(true);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsTitleValid(!!title.length);
    setIsUserIdValid(!!userId);

    if (title.length && userId) {
      const todoId = todos.reduce((acc, todo) => Math.max(acc, todo.id), 0);

      onAdd({
        id: todoId + 1,
        title,
        completed: false,
        userId,
        user: users
          .find((user: User) => user.id === userId) ?? null,
      });

      resetForm();
    }
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
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
          {users.map(({ id, name }) => (
            <option
              value={id}
              key={id}
            >
              {name}
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
