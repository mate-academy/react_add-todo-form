import { useState } from 'react';
import { Todo } from '../types/Todo';
import usersFromServer from '../../api/users';
import { User } from '../types/User';
import { getUserById } from '../services/services';

type Props = {
  onAdd: (todo: Todo) => void;
};

export const TodoForm: React.FC<Props> = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState(0);
  const [touched, setTouched] = useState(false);
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setTouched(true);

    if (user && title.trim()) {
      onAdd({
        id: 0,
        title,
        completed: false,
        userId: user,
        user: getUserById(user),
      });

      setTitle('');
      setUser(0);
      setTouched(false);
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
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={event => setTitle(event.target.value)}
        />
        {!title.trim() && touched
            && (<span className="error">Please enter a title</span>)}
      </div>

      <div className="field">
        <select
          data-cy="userSelect"
          onChange={event => setUser(+event.target.value)}
          defaultValue={0}
          value={user}
        >
          <option value="0">Choose a user</option>
          {usersFromServer.map((u: User) => (
            <option value={u.id} key={u.id}>{u.name}</option>
          ))}
        </select>

        {!user && touched
            && (<span className="error">Please choose a user</span>)}
      </div>

      <button type="submit" data-cy="submitButton">
        Add
      </button>
    </form>

  );
};
