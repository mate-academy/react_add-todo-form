import { UserInfo } from '../UserInfo';
import cn from 'classnames';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('message TodoInfo', {
        ['is-warning']: todo.completed === false,
        ['TodoInfo--completed is-success']: todo.completed === true,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
