import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { TodoWithUserInfo } from '../../types/TodoWithUserInfo';

type Props = {
  todo: TodoWithUserInfo;
};

export const TodoInfo = ({ todo }: Props) => (
  <article
    data-id={todo.id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
