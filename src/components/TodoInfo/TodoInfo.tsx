import { UserInfo } from '../UserInfo/UserInfo';

export const TodoInfo = ({ info, getUserById }) => {
  return (
    <article
      data-id={info.id}
      className={`TodoInfo ${info.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{info.title}</h2>

      <UserInfo user={getUserById(info.userId)} />
    </article>
  );
};
