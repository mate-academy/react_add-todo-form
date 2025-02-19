import { UserInfo } from '../UserInfo';
import { ToDo } from '../../types/ToDo';
import classNames from 'classnames';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo userId={todo.userId} />
    </article>
  );
};
