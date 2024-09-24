import cn from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import './TodoInfo.scss';
import { Todos } from '../typses/Todo';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed === true,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user!} />
    </article>
  );
};
