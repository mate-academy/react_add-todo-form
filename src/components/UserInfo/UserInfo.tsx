import React from 'react';
import { User } from '../../data/User';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <p>{`FullName: ${user.name}`}</p>
    <p>{`Email: ${user.email}`}</p>
    <p>{`Tel: ${user.phone}`}</p>
  </>
);
