import { UserInfo } from '../UserInfo';

export const TodoInfo = ({ todo }) => {
  const { id, completed, title, user } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''} `}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <UserInfo user={user} />
    </article>
  );
};
