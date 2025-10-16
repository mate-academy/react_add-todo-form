import cn from 'classnames';
import { TodoConfigurated } from '../../types/TodoConfigurated';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoConfigurated;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', { 'TodoInfo--completed': todo.completed })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
