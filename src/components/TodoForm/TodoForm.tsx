import { useState } from 'react';
import './TodoForm.scss';
import { User } from '../../types/user';
import { Todo } from '../../types/todo';
import { getNewTodoId } from '../../helpers/getNewPostId';
import { getUser } from '../../helpers/getUser';

interface Props {
  todos: Todo[];
  users: User[];
  onSubmit: (newTodo: Todo) => void;
}

export const TodoForm: React.FC<Props> = ({ todos, users, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('0');
  const [submitting, setSubmitting] = useState(false);

  const usersNames = users.map(({ name }) => name);

  const isTitleError = title === '';
  const isUserError = user === '0';

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const pattern = /^[A-Za-zА-ЩЇІЄҐа-щїієґ0-9\s]+$/;

    const cleanedInput = inputValue
      .split('')
      .filter(char => pattern.test(char) || char === ' ')
      .join('');

    setTitle(cleanedInput);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    if (!isTitleError && !isUserError) {
      const newUser = getUser(users, user);

      onSubmit({
        id: getNewTodoId(todos),
        title,
        completed: false,
        userId: newUser?.id || null,
        user: newUser,
      });

      setTitle('');
      setUser('0');
      setSubmitting(false);
    }
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      className="todo-form box"
      onSubmit={handleOnSubmit}
    >
      <div className="field">
        <label aria-label="Title">
          <input
            value={title}
            onChange={handleTitleChange}
            type="text"
            data-cy="titleInput"
            className="input"
            placeholder="Enter a title"
          />
        </label>

        {isTitleError && submitting && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label className="select is-block is-fullwidth">
          <select
            data-cy="userSelect"
            value={user}
            onChange={e => setUser(e.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>

            {usersNames.map(name => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        {isUserError && submitting && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        className="button is-primary is-fullwidth"
      >
        Add
      </button>
    </form>
  );
};
