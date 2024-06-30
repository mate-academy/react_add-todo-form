import { useState } from 'react';
import { Todo, User } from '../../types/types';
import usersFromServer from '../../api/users';
import { getNewTodoId } from '../../utils/utils';
import cn from 'classnames';

type FormTodoProps = {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
};

export const FormTodo: React.FC<FormTodoProps> = ({ todos, addTodo }) => {
  const [users] = useState<User[]>(usersFromServer);

  const [title, setTitle] = useState('');
  const [hasTitleErr, setHasTitleErr] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdErr, setHasUserIdErr] = useState(false);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setHasTitleErr(false);
  };

  const handleUserIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+e.target.value);
    setHasUserIdErr(false);
  };

  const handleReset = () => {
    setTitle('');
    setUserId(0);
    setHasTitleErr(!title);
    setHasUserIdErr(!userId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setHasTitleErr(!title);

    setHasUserIdErr(!userId);

    if (!title || !userId) {
      return;
    }

    addTodo({
      id: getNewTodoId(todos),
      title,
      completed: false,
      userId,
      user: usersFromServer.find(user => user.id === userId) || null,
    });

    handleReset();
  };

  return (
    <form
      className="box"
      action="/api/todos"
      method="POST"
      onSubmit={handleSubmit}
    >
      <div className="field">
        <label className="label" htmlFor="todo-title">
          Title:
        </label>
        <div className="control">
          <input
            id="todo-title"
            name="title"
            type="text"
            className={cn('input', { 'is-danger': hasTitleErr })}
            placeholder="Enter a title here"
            data-cy="titleInput"
            value={title}
            onChange={handleTitleChange}
          />
        </div>
        {hasTitleErr && (
          <p className="help is-danger error">Please enter a title</p>
        )}
      </div>

      <div className="field">
        <label
          className={cn('label', { 'is-danger': hasUserIdErr })}
          htmlFor="todo-userId"
        >
          User:
        </label>
        <div className="control">
          <div className={cn('select', { 'is-danger': hasUserIdErr })}>
            <select
              id="todo-userId"
              name="userId"
              data-cy="userSelect"
              value={userId}
              onChange={handleUserIdChange}
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
          </div>
        </div>

        {hasUserIdErr && (
          <p className="help is-danger error">Please choose a user</p>
        )}
      </div>

      <div className="buttons">
        <div className="control">
          <button
            className="button is-link"
            type="submit"
            data-cy="submitButton"
          >
            Add
          </button>
        </div>
      </div>
    </form>
  );
};
