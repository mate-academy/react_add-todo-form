import classNames from 'classnames';
import { TodoWithUsers } from '../../types/TodoWithUsersType';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: TodoWithUsers;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
