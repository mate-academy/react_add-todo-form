import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  {
    return (
      <article
        data-id="1"
        className={cn('TodoInfo', {
          'TodoInfo--completed': todo.completed,
        })}
      >
        <h2 className="TodoInfo__title">{todo.title}</h2>
        <UserInfo user={todo.userId} />
      </article>
    );
  }
};
