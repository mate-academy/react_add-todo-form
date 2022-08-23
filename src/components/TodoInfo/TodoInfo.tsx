import classNames from 'classnames';
import { MergeTodosUsers } from '../../type/types';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: MergeTodosUsers;
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
