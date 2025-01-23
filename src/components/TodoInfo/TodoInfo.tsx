import classNames from 'classnames';
import { TodoWithUser } from '../../App.types';
import './TodoInfo.scss';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: TodoWithUser;
}

export const TodoInfo = ({ todo }: Props) => {
  const { title, user, completed } = todo;

  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
