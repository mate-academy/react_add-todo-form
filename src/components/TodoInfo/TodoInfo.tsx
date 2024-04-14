import { Todo } from '../../type/Todo';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, completed, title, user } = todo;

  const todoClass = classNames('TodoInfo', {
    'TodoInfo--completed': completed,
  });

  return (
    <article data-id={id} className={todoClass}>
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
