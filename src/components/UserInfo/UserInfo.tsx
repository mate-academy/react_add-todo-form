import { UserInfoProps } from "../../types/User";

interface Props {
  user: UserInfoProps;
}

export const UserInfo = ({ user }: Props) => {
  if (!user) {
    return null;
  }
  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  )
};
