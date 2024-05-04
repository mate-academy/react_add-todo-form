import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

import { UserInfo } from '../UserInfo';

import './TodoInfo.scss';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user as User} />
    </article>
  );
};
