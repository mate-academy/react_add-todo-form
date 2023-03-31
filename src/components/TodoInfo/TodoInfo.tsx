import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({
  todo: {
    id, title, completed, user,
  },
}) => (
  <article
    data-id={id}
    className={classNames('TodoInfo',
      { 'TodoInfo--completed': completed })}
  >
    <h2 className="TodoInfo__title">{title}</h2>
    <UserInfo user={user} />
  </article>
);
