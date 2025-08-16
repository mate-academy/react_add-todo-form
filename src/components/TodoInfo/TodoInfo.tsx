import { UserInfo } from '../UserInfo/UserInfo';
import cn from 'classnames';
import { ITodosWithUsers } from '../../components/types/data.interface';
type Props = {
  todo: ITodosWithUsers;
};
export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
