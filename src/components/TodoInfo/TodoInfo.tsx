import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  info: Todo
}

export const TodoInfo: React.FC<Props> = ({ info }) => {
  const { title, completed, user } = info;
  const classes = classNames('TodoInfo', { 'TodoInfo--completed': completed });

  return (
    <article className={classes}>
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
