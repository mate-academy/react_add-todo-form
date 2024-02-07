import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todoInfo: Todo,
}

export const TodoInfo: React.FC<Props> = ({ todoInfo }) => {
  return (
    <article
      data-id={todoInfo.id}
      className={classNames('TodoInfo', {
        'TodoInfo--completed': todoInfo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todoInfo.title}
      </h2>

      <UserInfo
        user={todoInfo.user}
      />
    </article>
  );
};
