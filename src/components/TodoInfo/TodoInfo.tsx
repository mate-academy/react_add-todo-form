import classNames from 'classnames';
import { ToDo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      key={id}
      data-id={id}
      className={classNames('TodoInfo', {
        ['TodoInfo--completed']: completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
