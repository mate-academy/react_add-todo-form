import React, { useEffect, useState } from 'react';
import usersFromServer from '../../api/users';

export type InputValues = {
  title: string;
  user: number;
};

type Props = {
  onAddTodo: ({ title, user }: InputValues) => void;
};

const TodoForm: React.FC<Props> = ({ onAddTodo }) => {
  const [user, setUser] = useState(0);
  const [title, setTitle] = useState('');
  const [titileError, setTitleError] = useState(false);
  const [userError, setUserError] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (titileError || userError) {
      timer = setTimeout(() => {
        setTitleError(false);
        setUserError(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [titileError, userError]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setTitleError(!title);
    setUserError(!user);

    if (!user || !title) {
      return;
    }

    onAddTodo({ title, user });

    setUserError(false);
    setTitleError(false);
    setTitle('');
    setUser(0);
  };

  return (
    <form
      action="/api/todos"
      onSubmit={event => handleSubmit(event)}
      method="POST"
    >
      <div className="field">
        <label htmlFor="title">
          {`Title: `}
          <input
            type="text"
            id="title"
            value={title}
            data-cy="titleInput"
            placeholder="Please enter a title"
            onChange={event => setTitle(event.target.value)}
            onBlur={() => setTitleError(!title)}
          />
          {titileError && <span className="error">Please enter a title</span>}
        </label>
      </div>

      <div className="field">
        <label htmlFor="user">
          {`User: `}
          <select
            data-cy="userSelect"
            id="user"
            value={`${user}`}
            onChange={event => setUser(+event.target.value)}
            onBlur={() => setUserError(!title)}
          >
            <option value="0" disabled>
              Choose a user
            </option>
            {usersFromServer.map(item => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>

          {userError && <span className="error">Please choose a user</span>}
        </label>
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>
  );
};

export default TodoForm;
