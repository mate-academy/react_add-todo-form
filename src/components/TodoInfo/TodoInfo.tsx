import classNames from 'classnames';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../Types/Todo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames('message TodoInfo', {
        ['is-warning']: todo.completed === false,
        ['TodoInfo--completed is-success']: todo.completed === true,
      })}
    >
      <div className="message-header">
        <h2 className="TodoInfo__title">{todo.title}</h2>
      </div>

      <div className="message-body">
        <UserInfo user={todo.user} />
      </div>
    </article>
  );
};
