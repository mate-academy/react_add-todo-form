import classNames from 'classnames';
import { ToDo } from '../../types/ToDo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: ToDo;
};
export const TodoInfo: React.FC<Props> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={classNames('TodoInfo', {
      'TodoInfo--completed': todo.completed,
    })}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>

    <UserInfo user={todo.user} />
  </article>
);
