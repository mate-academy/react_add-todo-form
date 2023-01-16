import classNames from 'classnames';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import React from 'react';
import { Todo } from '../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <Card
    data-id={todo.id}
    className={classNames(
      'TodoInfo',
      {
        'TodoInfo--completed': todo.completed === true,
      },
    )}
  >
    <Typography
      gutterBottom
      variant="h6"
      component="h2"
      className="TodoInfo__title"
    >
      {todo.title}
    </Typography>

    {todo.user && (
      <UserInfo user={todo.user} />
    )}
  </Card>
);
