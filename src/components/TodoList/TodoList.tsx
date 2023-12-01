import cn from 'classnames';

type Props = {
  postWithUser:{ todo:
  { id: number; title: string; completed: boolean; userId: number; };
  foundUser: { id: number; name: string; username: string; email: string; }
  | undefined; }[],
};

export const TodoList: React.FC<Props> = ({
  postWithUser,
}) => {
  return (
    <section className="TodoList">
      {postWithUser.map(({ todo, foundUser }) => (
        <article
          data-id="1"
          className={cn('TodoInfo',
            { 'TodoInfo--completed': todo.completed })}
        >
          <h2 className="TodoInfo__title">
            {todo.title}
          </h2>
          {foundUser && (
            <a
              className="UserInfo"
              href={`mailto:${foundUser.email}`}
              key={todo.userId}
            >
              {foundUser.name}
            </a>
          )}
        </article>
      ))}
    </section>
  );
};
