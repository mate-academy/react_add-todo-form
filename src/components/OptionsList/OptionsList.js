/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';

function OptionsList(props) {
  const { users } = props;

  return (
    <>
      <option value="0">change user...</option>
      {
        users.map(user => (
          <option
            key={user.id}
            value={user.id}
          >
            {user.name}
          </option>
        ))
      }
    </>
  );
}

export default OptionsList;
