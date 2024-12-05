import { Users } from '../../types/Users';

type Props = {
  users: Users[];
};

export const TodoList: React.FC<Props> = props => {
  const { users } = props;

  return (
    <section className="TodoList">
      {users.map(user => (
        <article
          data-id="1"
          className="TodoInfo TodoInfo--completed"
          key={user.id}
        >
          <h2 className="TodoInfo__title">{user.todos?.title}</h2>

          <a className="UserInfo" href="mailto:Sincere@april.biz">
            {user.name}
          </a>
        </article>
      ))}
    </section>
  );
};
