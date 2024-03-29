export const UserInfo = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user.username}`}>
    {user.name}
  </a>
);
