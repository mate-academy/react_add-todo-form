import { UserInfo } from '../UserInfo';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface TodoInfoProps {
  id: number;
  title: string;
  completed: boolean;
  user: User;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({
  user,
  id,
  title,
  completed,
}) => {
  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
