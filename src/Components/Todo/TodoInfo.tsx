import { UserInfo } from '../User/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = (props) => {
  const { todo } = props;
  const { user, title } = todo;

  return (
    <>
      {user && <UserInfo user={user} />}
      <div className="list-item">{title}</div>
    </>
  );
};
