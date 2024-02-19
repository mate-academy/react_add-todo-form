import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../Types/Todo';
import './TodoInfo.scss';

type Props = {
  todo: Todo;
};

export const TodoInfo = ({ todo }: Props) => {
  const { title, user } = todo;

  if (!user) {
    return null;
  }

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
