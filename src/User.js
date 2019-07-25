import React from 'react';

import './user.css';

 const User = ({ visibleUser }) => (
  <>
    <td className="todolist-table__user">{ visibleUser.name }</td>
    <td className="todolist-table__user">{ visibleUser.email }</td>
    <td className="todolist-table__user">{ visibleUser.phone }</td>
  </>
);

 export default User;
