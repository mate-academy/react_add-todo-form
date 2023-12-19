import classNames from 'classnames';
import { ITodo } from '../../types';
import { UserInfo } from '../UserInfo';
import './TodoInfo.scss';

type Props = {
  todo: ITodo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    userId,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo userId={userId} />
    </article>
  );
};
