import { User } from '../../types/User';

export const UserInfo: React.FC<User> = ({ name, username, email }) => (
  <>
    <strong>
      Name
    </strong>
    {': '}
    {name}
    <br />
    <strong>
      User Name
    </strong>
    {': '}
    {username}
    <br />
    Email
    {': '}
    <a className="UserInfo" href={email}>
      {email}
    </a>
  </>
);
