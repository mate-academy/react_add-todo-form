import { FC } from 'react';
import cn from 'classnames';
import { Paper } from '@mui/material';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todo } from '../../types/Todo';
import './TodoInfo.scss';

interface Props {
  todo: Todo
}

export const TodoInfo: FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <Paper elevation={2} sx={{ backgroundColor: '#e0f7fa' }}>
      <article
        data-id={id}
        className={cn('TodoInfo', {
          'TodoInfo--completed': completed,
        })}
      >

        <h2 className="TodoInfo__title">
          {title}
        </h2>

        {user && (
          <UserInfo user={user} />
        )}
      </article>
    </Paper>
  );
};
