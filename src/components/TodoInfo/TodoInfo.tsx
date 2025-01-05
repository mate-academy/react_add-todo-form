import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  title: string;
  completed: boolean;
  user: {
    name: string;
    email: string;
  };
};

export const TodoInfo: React.FC<TodoInfoProps> = ({
  title,
  completed,
  user,
}) => {
  return (
    <article
      data-id="1"
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo name={user.name} email={user.email} />
    </article>
  );
};
