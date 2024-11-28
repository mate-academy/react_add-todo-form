import classNames from 'classnames';
import React from 'react';
import { User } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  currentUser?: User;
};
export const TodoInfo: React.FC<Props> = ({
  id,
  title,
  currentUser,
  completed,
}) => {
  return (
    <article
      key={id}
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {currentUser && <UserInfo userInfo={currentUser} />}
    </article>
  );
};
