type UsersItem = {
  id: number;
  name: string;
  username: string;
  email: string;
};

interface TodoInfoProps {
  user: UsersItem | undefined;
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ user }) => {
  return (
    <>
      {user && (
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.name}
        </a>
      )}
    </>
  );
};
