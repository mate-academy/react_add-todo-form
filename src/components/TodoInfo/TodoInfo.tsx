import React from 'react';
import classNames from 'classnames';
import './TodoInfo.scss';
import { UserInfo } from '../UserInfo';
import { User } from '../../types/User';
import { HandleCheckbox } from '../../types/HandleCheckbox';

type Props = {
  title: string;
  completed: boolean;
  user: User | null;
  id: number;
  handleCheckbox: HandleCheckbox;
};

export const TodoInfo: React.FC<Props> = ({
  title,
  completed,
  user,
  id,
  handleCheckbox,
}) => (
  <>
    <p>{title}</p>
    <label
      htmlFor={`${id}`}
      className={classNames(
        'todoStatus',
        {
          completed,
        },
      )}
    >
      Completed:
      <input
        type="checkbox"
        id={`${id}`}
        checked={completed}
        onChange={handleCheckbox}
      />
    </label>

    {user && (
      <UserInfo {...user} />
    )}
  </>
);
