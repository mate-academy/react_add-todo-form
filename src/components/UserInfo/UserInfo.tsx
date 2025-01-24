export const UserInfo = ({ user: { name, email } }) => (
  <a className="UserInfo" href={`mailto:${email}`}>
    {name}
  </a>
);
