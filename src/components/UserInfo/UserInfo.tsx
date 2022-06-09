// Don't forget to import the React library
import React from 'react';
// Create a `UserInfo` component accepting a `user` object and use it to render
// a `todo.user` in the list with some styling. (Show at least a `name` and an
// `email` of the `user`)
type Props = {
  name: string,
  email: string,
};
// Add a default export statement for UserInfo component to use it in the other files
const UserInfo: React.FC<Props> = ({ name, email }) => (
  <>
    <p className="todo__user__name subtitle is-4 is-spaced">
      <strong>Name:</strong>
      <br />
      {name}
    </p>
    <p className="todo__user__email subtitle is-5">
      <strong>Email:</strong>
      <br />
      {email}
    </p>
  </>
);

export default UserInfo;
