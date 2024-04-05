import classNames from 'classnames';
import { Todo } from '../../types/types';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, creator } = todo;
  const { name, email } = creator;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo name={name} email={email} />
    </article>
  );
};
