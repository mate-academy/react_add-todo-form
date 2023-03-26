import React from 'react';
import classNames from 'classnames';
import Card from 'react-bootstrap/Card';

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    completed,
    title,
    user,
  } = todo;

  return (
    <Card
      data-id={id}
      className={classNames(
        'TodoInfo', {
          'TodoInfo--completed': completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <div>
        {
          user
            ? <UserInfo user={user} />
            : 'User was not found'
        }
      </div>
    </Card>
  );
};
