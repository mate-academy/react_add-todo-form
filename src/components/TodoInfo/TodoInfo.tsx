import classNames from 'classnames';
import { Todos } from '../../types/todos';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todos
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={
        classNames('TodoInfo', {
          'TodoInfo--completed': todo.completed,
        })
      }
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo userId={todo.userId} />
    </article>
  );
};
