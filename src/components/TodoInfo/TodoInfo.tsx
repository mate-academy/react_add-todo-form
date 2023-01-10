import cn from 'classnames';
import { Todo } from '../../types/Todo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn(
        'TodoInfo',
        {
          'TodoInfo--completed': todo.completed,
        },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <a className="UserInfo" href="mailto:Sincere@april.biz">
        Leanne Graham
      </a>
    </article>
  );
};
