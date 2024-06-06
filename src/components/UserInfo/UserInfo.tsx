interface Props {
  user: User | undefined;
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={user === undefined ? undefined : user.email}>
      {user === undefined ? undefined : user.name}
    </a>
  );
};
