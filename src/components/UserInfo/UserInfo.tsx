import { UserInfoProps } from "../../types/UserInfo";


export const UserInfo: React.FC<UserInfoProps> = ({
  todo
}) => {
  return (
    <a className="UserInfo" href={`mailto:${todo.user?.email}`}>
      {todo.user?.name}
    </a>
  );
};
