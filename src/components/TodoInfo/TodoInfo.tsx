import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  id: number;
  title: string;
  user: {
    name: string;
    email: string;
  };
  completed: boolean;
};

export const TodoInfo: React.FC<TodoInfoProps> = ({
  id,
  title,
  user,
  completed,
}) => {
  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
