import { FC } from 'react';
import cn from 'classnames';
import { Card, CardContent, Typography } from '@mui/material';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo:FC<Props> = ({ todo }) => {
  const {
    title,
    completed = false,
    user,
    id,
  } = todo;

  return (
    <Card key={id} sx={{ marginBottom: '15px' }}>
      <CardContent>
        <Typography
          variant="subtitle2"
          component="h2"
          gutterBottom
          className={cn(
            'TodoInfo',
            {
              'TodoInfo--completed': completed,
            },
          )}
        >
          {title}
        </Typography>

        {user && (
          <UserInfo user={user} />
        )}
      </CardContent>
    </Card>
  );
};
