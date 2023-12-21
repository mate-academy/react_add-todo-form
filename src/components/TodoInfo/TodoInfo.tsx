import classnames from 'classnames';
import { User } from '../../type/user';
import { Todo } from '../../type/todo';

type Props = {
  todo: Todo;
  findUser: (id: number) => User | undefined;
};

export const TodoInfo: React.FC<Props> = (
  {
    todo: {
      id, completed, title, userId,
    },
    findUser,
  },
) => {
  return (
    <article
      data-id={id}
      className={classnames('TodoInfo', {
        'TodoInfo--completed': completed,
      })}
      key={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <a className="UserInfo" href={`mailto:${findUser(userId)?.email}`}>
        {findUser(userId)?.name}
      </a>
    </article>
  );
};
