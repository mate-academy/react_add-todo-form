import React from 'react';
import cn from 'classnames';
import Paper from '@mui/material/Paper';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <Paper
      sx={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      variant="outlined"
      data-id={todo.id}
      className={cn(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </Paper>
  );
};
