import React, { useContext, useEffect, useState } from 'react';
import { getUsers } from '../services/user';
import { User } from '../types';

const UsersContext = React.createContext<User[]>([]);

export const useUsers = () => useContext(UsersContext);

export const UsersProvider: React.FC = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return (
    <UsersContext.Provider value={users}>
      {children}
    </UsersContext.Provider>
  );
};
