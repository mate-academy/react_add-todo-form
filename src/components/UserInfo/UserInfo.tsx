import { User } from '../../types';

type Props = {
  user: User;
};

export const UserInfo = (props: Props) => {
  return (
    <a className="UserInfo" href={`mailto:${props.user.email}`}>
      {props.user.name}
    </a>
  );
};
