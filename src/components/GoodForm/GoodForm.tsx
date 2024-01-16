import React, { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
// import colorsFromServer from '../../api/colors';
import { GoodsOperationsContext } from '../GoodsProvider';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { getUsers } from '../../api';

type Props = {
  todo?: Todo;
  setEditing?: (value: boolean) => void;
};

export const GoodForm: React.FC<Props> = ({
  todo,
  setEditing,
}) => {
  const [name, setName] = useState(todo?.title ?? '');
  const [hasNameError, setHasNameError] = useState(false);
  const [usersFromServer, setUsersFromServer] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(todo?.userId ?? 0);

  useEffect(() => {
    getUsers()
      .then(setUsersFromServer);
  }, []);

  const { updateGoodsHandler, addGoodHandler } = useContext(
    GoodsOperationsContext,
  );

  const hasEmptyFields = !name || !selectedUserId;

  const resetForm = () => {
    setName('');
    setSelectedUserId(0);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name) {
      setHasNameError(true);

      return;
    }

    const goodHandler = todo ? updateGoodsHandler : addGoodHandler;

    goodHandler({
      id: todo?.id ?? 0,
      title: name,
      userId: selectedUserId,
      completed: false,
    });

    setEditing?.(false);

    resetForm();
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
      <input
        className={cn({
          'with-error': hasNameError,
        })}
        type="text"
        value={name}
        onChange={(event) => {
          setName(event.target.value);

          if (event.target.value) {
            setHasNameError(false);

            return;
          }

          setHasNameError(true);
        }}
      />

      <select
        value={selectedUserId}
        onChange={(event) => {
          setSelectedUserId(+event.target.value);
        }}
      >
        <option value="0" disabled>Choose a user</option>
        {usersFromServer.map(user => (
          <option
            key={user.id}
            value={user.id}
          >
            {user.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        disabled={hasEmptyFields}
      >
        Add
      </button>
    </form>
  );
};
