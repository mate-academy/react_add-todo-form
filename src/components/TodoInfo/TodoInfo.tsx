import classNames from 'classnames';
import { Todo } from '../../Types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({
  todo: { title, completed, userId },
}) => {
  return (
    <>
      <article
        data-id="1"
        className={classNames('TodoInfo', {
          'TodoInfo--completed': completed,
        })}
      >
        <h2 className="TodoInfo__title">{title}</h2>

        <UserInfo userId={userId} />
      </article>
    </>
  );
};
