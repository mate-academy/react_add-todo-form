import { IUser } from '../../types';
import { UsersContext, UsersContextType } from './context/UsersContext';

type Props = {
  users: IUser[]
};

export const UsersProvider: React.FC<Props> = ({
  users,
  children,
}) => {
  const getUserById = (id: number) => (
    users.find(user => user.id === id)
  );

  const contextValue: UsersContextType = {
    users,
    getUserById,
  };

  return (
    <UsersContext.Provider value={contextValue}>
      { children }
    </UsersContext.Provider>
  );
};
