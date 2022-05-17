import classNames from 'classnames';
import React from 'react';
import './TodoItem.scss';

type Props = {
  userName: string;
  userEmail: string;
  title: string;
  completed: boolean;
};

export const TodoItem: React.FC<Props> = ({
  userName,
  userEmail,
  title,
  completed,
}) => (
  <>
    <p>
      {`Name: ${userName}`}
    </p>
    <p>
      {`Email: ${userEmail}`}
    </p>
    <p className={classNames(completed
      ? 'completed'
      : 'active')}
    >
      {`To do: ${title}`}
    </p>
  </>
);
