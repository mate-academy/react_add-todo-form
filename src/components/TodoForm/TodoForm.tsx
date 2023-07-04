import {
  FC, useState, FormEvent, ChangeEvent,
} from 'react';
import { TodoWithUser } from '../../types/TodoWithUser';
import { User } from '../../types/User';
import { getUserById } from '../../getUserById';

type Props = {
  users: User[];
  onAddTodo: (newTodo: TodoWithUser) => void;
};

export const TodoForm: FC<Props> = (props) => {
  const { users, onAddTodo } = props;

  const [title, setTitle] = useState<string>('');
  const [titleError, setTitleError] = useState<boolean>(false);

  const [userId, setUserId] = useState(0);
  const [userIdError, setUserIdError] = useState<boolean>(false);

  const sanitizeTitle = (str: string) => {
    const regex = /[^\w\sа-яА-ЯїЇіІ'0-9]/g;

    return str.replace(regex, '');
  };

  const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setTitleError(false);
  };

  const handleChangeUserId = (event: ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setUserIdError(false);
  };

  const resetForm = () => {
    setTitle('');
    setUserId(0);

    setTitleError(false);
    setUserIdError(false);
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    setTitleError(!title);
    setUserIdError(!userId);

    if (!title || !userId) {
      return;
    }

    const newTodo: TodoWithUser = {
      id: 0,
      title: sanitizeTitle(title),
      completed: false,
      userId,
      user: getUserById(userId, users),
    };

    onAddTodo(newTodo);
    resetForm();
  };

  return (
    <form
      action="/api/todos"
      method="POST"
      onSubmit={onSubmit}
    >
      <div className="field">
        <label>
          Title:&nbsp;

          <input
            type="text"
            value={title}
            placeholder="Enter a title"
            onChange={handleChangeTitle}
            data-cy="titleInput"
          />
        </label>

        {titleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label>
          User:&nbsp;

          <select
            data-cy="userSelect"
            value={userId}
            onChange={handleChangeUserId}
          >
            <option disabled value="0">
              Choose a user
            </option>

            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>

        {userIdError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
