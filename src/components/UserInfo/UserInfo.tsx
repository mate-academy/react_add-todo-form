import { IUsers } from '../../components/types/data.interface';
type Props = {
  user: IUsers;
};
export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
