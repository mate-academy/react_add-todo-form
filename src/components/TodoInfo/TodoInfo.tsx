import { UserInfo } from '../UserInfo';

interface TodoInfoProps {
  id: number;
  title: string;
  completed: boolean;
  user: { name: string; email: string };
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
