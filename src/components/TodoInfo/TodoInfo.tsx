import usersFromServer from '../../api/users';

type TodoInfoProps = {
  todo: {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
  };
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  const user = usersFromServer.find(u => u.id === todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {user && (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      )}
    </article>
  );
};
