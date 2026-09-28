import * as Types from '../../types';

export const UserInfo = ({ user }: Types.PropUser) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
