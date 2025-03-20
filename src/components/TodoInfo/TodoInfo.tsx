import { UserInfo } from '../UserInfo';
import { Todos } from '../../types/types';
import classNames from 'classnames';

type Props = {
  todo: Todos;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames(
        todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo',
      )}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
