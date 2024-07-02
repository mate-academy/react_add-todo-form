import classNames from 'classnames';
import { UserInfo } from '../UserInfo';

type Props = {
  title: string;
  id: number;
  completed: boolean;
  email: string;
  name: string;
};

export const TodoInfo: React.FC<Props> = ({
  title,
  id,
  email,
  name,
  completed,
}) => {
  return (
    <article data-id={id} className="TodoInfo TodoInfo--completed">
      <h2
        className={classNames('TodoInfo__title', {
          'TodoInfo--completed': completed,
        })}
      >
        {title}
      </h2>

      <UserInfo userEmail={email} userName={name} />
    </article>
  );
};
