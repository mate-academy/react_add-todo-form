import classNames from 'classnames';
import { TodoWithUser } from '../../App.types';
import './TodoInfo.scss';

interface Props {
  todo: TodoWithUser;
}

export const TodoInfo = ({ todo }: Props) => {
  const { title, user, completed } = todo;
  const { name, email } = user;

  return (
    <article
      data-id="1"
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <a className="UserInfo" href={email}>
        {name}
      </a>
    </article>
  );
};
