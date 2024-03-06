import cn from 'classnames';
import { UserInfo } from '../UserInfo';
import users from '../../api/users';

interface Props {
  completed: boolean;
  title: string;
  userId: number;
  todoId: number;
}

export const TodoInfo: React.FC<Props> = ({
  completed,
  title,
  userId,
  todoId,
}) => {
  return (
    <article
      data-id={todoId}
      className={cn('TodoInfo', { 'TodoInfo--completed': completed })}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {users.map(
        ({ id, name, email }) =>
          id === userId && <UserInfo key={id} email={email} name={name} />,
      )}
    </article>
  );
};
