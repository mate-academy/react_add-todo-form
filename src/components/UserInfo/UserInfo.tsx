import { User } from '../../types/User';

type Props = {
  todoUser: User | null | undefined;
};

export const UserInfo:React.FC<Props> = ({ todoUser }) => {
  const { email, name } = todoUser as User;

  return (
    <>
      {todoUser && (
        <a className="UserInfo" href={`mailto:${email}`}>
          {name}
        </a>
      )}
    </>
  );
};
