import cn from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo',
        'message',
        'is-success',
        'pb-2',
        { 'is-danger': !todo.completed })}
    >
      <h2 className="TodoInfo__title message-header">
        {todo.title}
      </h2>

      {todo.user && (<UserInfo user={todo.user} />)}
    </article>
  );
};
