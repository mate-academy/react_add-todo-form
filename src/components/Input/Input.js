import React from 'react';
import Proptypes from 'prop-types';

export const Input = (props) => {
  const { name, onChange, labelText, id, value, error } = props;

  return (
    <div className="field">
      <label className="label" htmlFor={id}>{labelText}</label>
      <div className="control">
        <input
          className="input"
          type="text"
          name={name}
          id={id}
          value={value}
          placeholder={labelText}
          onChange={onChange}
        />
      </div>
      <p className="help is-danger">{error}</p>
    </div>
  );
};

Input.defaultProps = {
  error: null,
};

Input.propTypes = {
  name: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  labelText: Proptypes.string.isRequired,
  id: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  error: Proptypes.string,
};
