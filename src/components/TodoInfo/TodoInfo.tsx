interface TodoInfoProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  };
  userComponent: React.ComponentType<{
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  }>;
}

export const TodoInfo = ({
  todo,
  userComponent: UserComponent = () => null,
}: TodoInfoProps) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserComponent user={user} />
    </article>
  );
};
