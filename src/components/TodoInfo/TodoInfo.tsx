import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: {
    id: number;
    title: string;
    user?: {
      name: string;
      email: string;
    };
    completed: boolean;
  };
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const { title, user, completed, id } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
