import cn from 'classnames';
import { TodoElement } from '../Type/type';
import { UserInfo} from '../UserInfo';

type Props = {
  todo: TodoElement;
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
