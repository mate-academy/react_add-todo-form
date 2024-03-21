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
  const [userId, setUserId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const usersNames = users.map(({ name }) => name);

  const isTitleError = !title;
  const isUserError = !userId;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    const pattern = /[^A-Za-zА-ЩЇІЄҐа-щїієґ0-9\s]/g;

    const cleanedInput = inputValue.replace(pattern, '');

    setTitle(cleanedInput);
  };

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (!isTitleError && !isUserError) {
      const newUser = getUser(users, userId);

      onSubmit({
        id: getNewTodoId(todos),
        title,
        completed: false,
        userId: newUser?.id || null,
        user: newUser,
      });

      setTitle('');
      setUserId('');
      setIsSubmitting(false);
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

        {isTitleError && isSubmitting && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label className="select is-block is-fullwidth">
          <select
            data-cy="userSelect"
            value={userId}
            onChange={event => setUserId(event.target.value)}
          >
            <option value="" disabled>
              Choose a user
            </option>

            {usersNames.map(name => (
              <option value={name} key={name}>
                {name}
              </option>
            ))}
          </select>
        </label>

        {isUserError && isSubmitting && (
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
