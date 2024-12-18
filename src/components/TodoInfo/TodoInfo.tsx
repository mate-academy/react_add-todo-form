import classNames from 'classnames';
import { Todo } from '../../types/types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  const todoInfoClass = classNames('TodoInfo', {
    'TodoInfo--completed': completed,
  });

  return (
    <article data-id={id} className={todoInfoClass}>
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
