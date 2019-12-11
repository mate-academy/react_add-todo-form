import React from 'react';
import PropTypes from 'prop-types';

const Options = ({ users }) => (
  <>
    {users.map(
      user => <option value={user.id} key={user.name}>{user.name}</option>
    )}
  </>
);

Options.propTypes
  = {
    users: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.object]))),
  };

Options.defaultProps
  = {
    users: [],
  };
export default Options;
