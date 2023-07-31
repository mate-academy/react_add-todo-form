import { User } from '../../types/User';
import { OptionInfo } from '../OptionInfo';

type Props = {
  users: User[],
};

export const OptionList: React.FC<Props> = ({ users }) => (
  <>
    {users.map(user => <OptionInfo key={user.id} user={user} />)}
  </>
);
