import classNames from 'classnames';
import { UserInfo } from '../UserInfo/UserInfo';
import { Todos } from '../../types/Todos';

type Style = {
  todo: Todos;
};

export const TodoInfo: React.FC<Style> = ({ todo }) => {
  const {
    title,
    completed,
    user,
    id,
  } = todo;

  return (
    <>
      <article
        data-id={id}
        // className="TodoInfo TodoInfo--completed"
        className={classNames('TodoInfo', {
          'TodoInfo--completed': completed,
        })}
      >
        <h2 className="TodoInfo__title">
          {title}
        </h2>

        {user && (
          <UserInfo user={user} />
        )}
      </article>
    </>
  );
};
