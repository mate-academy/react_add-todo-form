import React from 'react';
import PropTypes from 'prop-types';

import users from '../api/users';
import todos from '../api/todos';

function TodoList() {
  const todoItems = todos.map(item => <TodoItem key={item.id} item={item} />);

  return (
    <div className="TodoList">
      {todoItems}
    </div>
  );
}

function TodoItem({ item }) {
  const filteredUsers = users.filter(user => user.id === item.userId);

  return (
    <div className="TodoItem">
      <div className="ItemHeader">
        <input type="checkbox" checked={item.completed} />
        <h2>{item.title}</h2>
      </div>
      <table className="User">
        <thead>
          <tr>
            <th>Name</th>
            <th>User name</th>
            <th>Email</th>
            <th>Adress</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>{user.phone}</td>
              <td>{user.wesite}</td>
              <td>{user.company.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

TodoItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
    phone: PropTypes.string,
    website: PropTypes.string,
    company: PropTypes.object,
  }).isRequired,
};

export default TodoList;
