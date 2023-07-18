import classNames from 'classnames';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    // eslint-disable-next-line
    <article data-id={todo.id} className={classNames('TodoInfo', {'TodoInfo--completed': todo.completed})}>
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
