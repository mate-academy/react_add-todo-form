export const UserInfo = ({
  user,
}: {
  user: { name: string; email: string };
}) => {
  return (
    <a className="UserInfo" href={`mailto:${user?.email}`}>
      {user?.name}
    </a>
  );
};
