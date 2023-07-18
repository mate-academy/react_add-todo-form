import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: TodoType,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    user,
    completed,
    title,
  } = todo;

  return (
    <article
      className={
        classNames('TodoInfo', { 'TodoInfo--completed': completed })
      }
      data-id={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && (<UserInfo user={user} />)}
    </article>
  );
};
