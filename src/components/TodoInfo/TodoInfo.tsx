import cn from 'classnames';

import { ITodo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: ITodo;
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    completed,
    title,
    user,
  },
}) => {
  return (
    <article
      data-id={id}
      className={
        cn(
          'TodoInfo',
          { 'TodoInfo--completed': completed },
        )
      }
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
