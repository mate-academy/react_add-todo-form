/* eslint-disable no-console */
/*neslint-disable no-console */
import { TodoWithUser } from '../TodoList';
import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
interface Props {
  todo: TodoWithUser;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  console.log('TodoInfo id:', todo.id);

  return (
    <article
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
