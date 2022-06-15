import React from 'react';

import { User } from '../../types';

type Props = {
  user: User | null,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (user && (
    <div>
      <span data-cy="username" className="fs-4">
        {`Assigned by: ${user.username}`}
      </span>
      <br />
      <span data-cy="email" className="fs-6">
        {`Email: ${user.email}`}
      </span>
      <br />
      <span className="fs-6">
        {`Adress: ${user.address.suite}, ${user.address.street}, ${user.address.city}`}
      </span>
      <br />
      <span className="fs-6">
        {`Phone: ${user.phone}`}
      </span>
    </div>
  ));
};

// Create a `UserInfo` component accepting a `user` object and use it to render
// a `todo.user` in the list with some styling. (Show at least a `name` and an
// `email` of the `user`)

// Add a default export statement for UserInfo component to use it in the other files
