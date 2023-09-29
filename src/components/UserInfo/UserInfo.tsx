import { User } from '../../Types/Types';

export const UserInfo: React.FC<{ user: User }> = (
  { user: { name, email } },
) => {
  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
