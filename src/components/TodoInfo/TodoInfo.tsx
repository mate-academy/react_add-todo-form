import cn from 'classnames';

import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = (props) => {
  const { todo } = props;
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={cn(
        'TodoInfo', { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      {user
        && <UserInfo user={user} />}
    </article>
  );
};
