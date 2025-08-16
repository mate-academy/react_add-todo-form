import { useState } from 'react';
import { Todo, User } from '../../types';

type Props = {
  users: User[];
  todos: Todo[];
  onSubmit: (newTodos: Todo) => void;
};

export const Form: React.FC<Props> = ({ users, onSubmit, todos }) => {
  const [count, setCount] = useState(0);
  const [title, setTitle] = useState('');
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState<number>(0);
  const [hasUserNameError, sethasUserNameError] = useState(false);

  const handleOnTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleOnUserIdChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setUserId(Number(+event.target.value));
    sethasUserNameError(false);
  };

  const findUser = (id: number) => {
    return users.find(user => user.id === id)!;
  };

  function getNewPostId(todosArr: Todo[]) {
    const maxId = Math.max(...todosArr.map(todo => todo.id));

    return maxId + 1;
  }

  function getRandomDigits() {
    return Math.random().toFixed(16).slice(2);
  }

  const [idTitle] = useState(() => `title-${getRandomDigits()}`);
  const [idUser] = useState(() => `user-${getRandomDigits()}`);

  const notAllDataInput = !title.trim() || !userId;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (title.trim().length === 0) {
      setHasTitleError(true);
    }

    if (!userId) {
      sethasUserNameError(true);
    }

    if (!notAllDataInput) {
      const user = findUser(userId);

      onSubmit({
        id: getNewPostId(todos),
        title: title.trim(),
        userId: user.id,
        completed: false,
        user,
      });

      setCount(prev => prev + 1);
      setTitle('');
      setUserId(0);
      setHasTitleError(false);
      sethasUserNameError(false);
    }
  };

  return (
    <form action="/api/todos" method="POST" key={count} onSubmit={handleSubmit}>
      <div className="field">
        <label className="label" htmlFor={idTitle}>
          Title
        </label>
        <input
          id={idTitle}
          type="text"
          value={title}
          data-cy="titleInput"
          onChange={handleOnTitle}
        />
        {hasTitleError && <span className="error">Please enter a title</span>}
      </div>

      <div className="field">
        <label className="label" htmlFor={idUser}>
          User
        </label>
        <select
          id={idUser}
          data-cy="userSelect"
          value={userId}
          onChange={handleOnUserIdChange}
        >
          <option value="" disabled>
            Choose a user
          </option>

          {users.map((user: User) => {
            return (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            );
          })}
        </select>

        {hasUserNameError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};
