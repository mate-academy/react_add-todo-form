import {
  FC, memo, useCallback, useMemo, useState,
} from 'react';
import { Button } from 'react-bootstrap';
import { Todo } from '../../types/Todo';
import { getUsers } from '../../api/users';
import { todos } from '../../api/todos';

interface Props {
  onSubmit: (todo: Todo) => void;
}

export const TodoForm: FC<Props> = memo(({ onSubmit }) => {
  const users = useMemo(getUsers, []);

  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');
  const [availableId, setAvailableId] = useState(
    todos[todos.length - 1].id + 1,
  );

  const [isTitleErrorShown, setTitleErrorShown] = useState(false);
  const [isOptionErrorShown, setOptionErrorShown] = useState(false);

  const handleInputChange = useCallback((value) => {
    setTitleErrorShown(false);
    setTitle(value);
  }, []);

  const handleSelectorChange = useCallback(({ target }) => {
    setOptionErrorShown(false);
    setUsername(target.value);
  }, []);

  const clearForm = useCallback(() => {
    handleInputChange('');
  }, []);

  const handleFormSubmission = useCallback((event) => {
    event.preventDefault();

    if (!title || !username) {
      setTitleErrorShown(!title);
      setOptionErrorShown(!username);

      return;
    }

    const user = users.find(
      ({ fullName }) => fullName === username,
    ) || null;

    onSubmit({
      user: user || null,
      userId: user?.userId || null,
      todoId: availableId,
      completed: false,
      title: title.trim(),
    });

    setAvailableId(prevId => prevId + 1);
    setUsername('');

    clearForm();
  }, [title, username]);

  return (
    <div className="TodoForm">
      <div className="TodoForm__content">
        <form
          className="TodoForm__form"
          action="#"
          method="post"
          onSubmit={handleFormSubmission}
        >
          <div className="TodoForm__container">
            <label
              className="TodoForm__title"
              htmlFor="input"
            >
              <span className="TodoForm__title-label">
                Title
              </span>

              <input
                id="input"
                className="TodoForm__title-input"
                value={title}
                placeholder="Enter todo title..."
                autoComplete="off"
                onChange={({ target }) => {
                  handleInputChange(target.value);
                }}
              />
            </label>

            {isTitleErrorShown && (
              <p className="TodoForm__container-error">
                Enter a valid title!
              </p>
            )}
          </div>

          <div className="TodoForm__container">
            <div className="TodoForm__options">
              <span className="TodoForm__options-label">
                Name
              </span>

              <select
                className="TodoForm__options-selector"
                value={username}
                onChange={handleSelectorChange}
              >
                {!username && (<option>Choose a users...</option>)}

                {users
                  .map(user => user.fullName)
                  .map(name => (
                    <option key={`user-${name}`} value={name}>
                      {name}
                    </option>
                  ))}
              </select>
            </div>

            {isOptionErrorShown && (
              <p className="TodoForm__container-error">
                Choose an option!
              </p>
            )}
          </div>

          <Button
            className="TodoForm__submitButton"
            type="submit"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
});
