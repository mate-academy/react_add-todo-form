import React from 'react';
import PropTypes from 'prop-types';

const User = ({ item }) => {
  const { user } = item;

  return (
    <>
      {user ? <p className="name">{user.name}</p>
        : <p className="name__isnotDefined">Name is not defined</p>}
    </>
  );
};

User.propTypes = {
  item: PropTypes.string.isRequired,
};

export default User;
