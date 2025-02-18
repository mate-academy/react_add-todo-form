import { ITodoListItem } from '../../interface/ITodoListItem';
import { UserInfo } from '../UserInfo';
import classNames from 'classnames';

type Props = {
  todo: ITodoListItem;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, user, title, completed } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', completed && 'TodoInfo--completed')}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
