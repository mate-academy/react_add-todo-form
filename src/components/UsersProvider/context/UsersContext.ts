import { createContext, useContext } from 'react';
import { IUser } from '../../../types';

export type UsersContextType = {
  users: IUser[];
  getUserById: (id: number) => IUser | undefined;
};

export const UsersContext = createContext<UsersContextType | null>(null);

export const useUsers = (): UsersContextType => {
  const context = useContext(UsersContext);

  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }

  return context;
};
