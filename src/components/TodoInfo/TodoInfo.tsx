import classNames from 'classnames';
import { TodoItem } from '../../types/TodoItem';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoItem;
};

export const TodoInfo = ({ todo }: Props) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
