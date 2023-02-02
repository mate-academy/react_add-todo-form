import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

type Props = {
  id: number,
  title: string,
  completed: boolean,
  userId: number,
};

export const TodoInfo: React.FC<Props> = ({
  id,
  title,
  completed,
  userId,
}) => {
  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      <UserInfo id={userId} />
    </article>
  );
};
