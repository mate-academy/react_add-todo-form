import { User } from '../../types/User';

type Props = {
  todoUser?: User | null;
};

export const UserInfo:React.FC<Props> = ({ todoUser }) => (
  <>
    {todoUser && (
      <a className="UserInfo" href={`mailto:${todoUser.email}`}>
        {todoUser.name}
      </a>
    )}
  </>
);
