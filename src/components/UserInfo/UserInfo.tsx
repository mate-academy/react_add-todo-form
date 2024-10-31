import { IUser } from '../../types/user';

export const UserInfo = ({ user }: { user: IUser }) => (
  <a className="UserInfo" href={`mailto:${user.email}`}>
    {`${user.name}`}
  </a>
);
