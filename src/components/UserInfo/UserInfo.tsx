import { Users } from "../../types/Users";

interface Props {
  user: Users,
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  const {name, email} = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  )
};
