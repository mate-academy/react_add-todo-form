import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';
import { getUserById } from '../../services/GetUser';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id,
    completed,
    title,
    userId,
  },
}) => (
  <article
    data-id={id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': completed,
    })}
  >
    <h2 className="TodoInfo__title">
      {title}
    </h2>

    <UserInfo user={getUserById(userId)} />
  </article>
);
