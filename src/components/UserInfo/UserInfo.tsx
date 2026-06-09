import { User } from '../../types/User';

export const UserInfo = (props: { user: User }) => (
  <a className="UserInfo" href={`mailto:${props.user.email}`}>
    {props.user.name}
  </a>
);
