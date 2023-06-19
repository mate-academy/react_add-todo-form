import { FC } from 'react';
import cn from 'classnames';
import { Typography, ListItem, ListItemText } from '@mui/material';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    user,
    title,
    id,
    completed,
  } = todo;

  return (
    <ListItem
      key={id}
      data-id={id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <ListItemText>
        <Typography variant="h5" className="TodoInfo__title">
          {title}
        </Typography>
      </ListItemText>

      {user && <UserInfo user={user} />}
    </ListItem>
  );
};
