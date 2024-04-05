import classNames from 'classnames';
import { Todo } from '../../types/types';

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

      <a className="UserInfo" href={`mailto:${email}`}>
        {name}
      </a>
    </article>
  );
};
