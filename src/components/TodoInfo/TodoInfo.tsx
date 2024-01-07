import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import { TodosFromServer } from '../../types/TodosFromServer';

interface Props {
  todo: TodosFromServer
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id="1"
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >

      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo userId={todo.userId} />
    </article>
  );
};
