import { User } from '../../react-app-env';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  title: string,
  completed: boolean,
  user: User | null,
};

export const TodoInfo : React.FC<Props> = ({ title, completed, user }) => {
  return (
    <div>
      <h2 data-cy="title">{`Task: ${title}`}</h2>
      <p data-cy="status">
        {completed
          ? ('Completed')
          : ('Not Completed')}
      </p>
      {user && (
        <UserInfo
          name={user.name}
          email={user.email}
        />
      )}
    </div>
  );
};
