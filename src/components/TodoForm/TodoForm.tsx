import { useState } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Props = {
  users: User[];
  onAdd: (newTodo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ users, onAdd }) => {
  const [title, setTitle] = useState<string>('');
  const [user, setUser] = useState<number>(0);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const isValid = title.length > 0 && user !== 0;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isValid) {
      return;
    }

    onAdd({
      id: 0,
      title,
      completed: false,
      userId: user,
    });

    setTitle('');
    setUser(0);
  };

  const changeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newTitle = e.target.value;

    newTitle = newTitle.replace(/[^\sа-яА-ЯіІїЇA-Za-z0-9,.]/gi, '');
    setTitle(newTitle);
  };

  return (
    <form action="/api/todos" method="POST" onSubmit={handleSubmit}>
      <div className="field">
        <label>
          Title:&nbsp;
          <input
            type="text"
            data-cy="titleInput"
            placeholder="Enter a title"
            value={title}
            onChange={changeTitle}
          />
        </label>
        {submitted && !title && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <div className="field">
        <label>
          User:&nbsp;
          <select
            data-cy="userSelect"
            value={user}
            onChange={event => setUser(+event.target.value)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {users.map(option => (
              <option value={option.id} key={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </label>
        {submitted && !user && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button
        type="submit"
        data-cy="submitButton"
        disabled={submitted && !isValid}
      >
        Add
      </button>
    </form>
  );
};
