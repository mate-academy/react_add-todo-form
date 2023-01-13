import cn from 'classnames';

import { CardActionArea, CardContent, Paper } from '@mui/material';

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const {
    completed,
    title,
    user,
    userId,
  } = todo;

  return (
    <article
      data-id={todo.id}
      className={cn(
        'TodoInfo',
        {
          'TodoInfo--completed': completed,
        },
      )}
    >

      <CardActionArea>
        <Paper elevation={8}>
          <CardContent>
            <h2 className="TodoInfo__title">
              {title}
            </h2>

            {user && (
              <UserInfo key={userId} user={user} />
            )}
          </CardContent>
        </Paper>
      </CardActionArea>
    </article>
  );
};
