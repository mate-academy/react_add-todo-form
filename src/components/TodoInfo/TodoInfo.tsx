import classNames from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { user, title, completed } = todo;

  return (
    <>
      <h2 className="subtitle is-3">{title}</h2>
      <p className={classNames('subtitle is-5', {
        'has-text-success': completed,
        'has-text-danger': !completed,
      })}
      >
        {completed ? 'Done' : 'Not completed!'}
      </p>
      <UserInfo user={user} />
    </>
  );
};
