import classNames from 'classnames';

import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo,
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id, title, completed, user,
  } = todo;
  const isCompleted = classNames('TodoInfo', {
    'TodoInfo--completed': completed,
  });

  return (
    <article data-id={id} className={isCompleted}>
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} key={id} />}
    </article>
  );
};
