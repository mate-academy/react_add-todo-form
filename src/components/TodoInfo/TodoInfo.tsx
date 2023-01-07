import React from 'react';
import cn from 'classnames';
import { CardActionArea, CardContent, Typography } from '@mui/material';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = React.memo(
  ({ todo }) => {
    const {
      id, title, user, completed,
    } = todo;

    return (
      <article
        data-id={id}
        className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
        key={id}
      >
        <CardActionArea>
          <CardContent>
            <Typography className="TodoInfo__title">
              {title}
            </Typography>

            <Typography gutterBottom variant="h5" component="div">
              {user && <UserInfo user={user} />}
            </Typography>
          </CardContent>
        </CardActionArea>
      </article>
    );
  },
);
