import React from 'react';

 const User = ({ visibleUser }) => (
  <>
    <td className="table__user">{ visibleUser.name }</td>
    <td className="table__user">{ visibleUser.email }</td>
    <td className="table__user">{ visibleUser.phone }</td>
  </>
);

 export default User;
