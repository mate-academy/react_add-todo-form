import React from 'react';
import Proptypes from 'prop-types';
import users from '../../api/users';

export const Select = (props) => {
  const { name, id, labelText, value, onChange, error } = props;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>{labelText}</label>
      <div className="control">
        <div className="select">
          <select
            value={value || 0}
            name={name}
            id={id}
            onChange={onChange}
          >
            <option disabled value={0}>{labelText}</option>
            {users.map(
              user => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.name}
                </option>
              ),
            )}
          </select>
        </div>
      </div>
      <p className="help is-danger">{error}</p>
    </div>
  );
};

Select.defaultProps = {
  value: null,
  error: null,
};

Select.propTypes = {
  name: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  labelText: Proptypes.string.isRequired,
  id: Proptypes.string.isRequired,
  value: Proptypes.string,
  error: Proptypes.string,
};
