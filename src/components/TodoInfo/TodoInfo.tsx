import classNames from 'classnames';
import { PrepareTodo } from '../../types/PrepareTodo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: PrepareTodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && (
        <UserInfo user={todo.user} />
      )}
    </article>
  );
};
