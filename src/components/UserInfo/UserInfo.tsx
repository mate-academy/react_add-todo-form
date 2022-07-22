import { User } from '../../types/User';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    {user && (
      <>
        <p>
          {'Name: '}
          {user.name}
        </p>
        <span>{'Email: '}</span>
        <a className="UserInfo" href={`mailto:${user.email}`}>
          {user.email}
        </a>
      </>
    )}
  </>
);
