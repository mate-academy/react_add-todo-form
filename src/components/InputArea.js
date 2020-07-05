import React from 'react';
import PropTypes from 'prop-types';

export const InputArea = (props) => {
  const { inputError, onClick, value, onChange } = props;

  return (
    <div className="input_area">
      <label htmlFor="title">
        {!!inputError && <div className="error">Wrong input</div>}
        <input
          className="input"
          onClick={event => onClick(event.target)}
          placeholder="Make review PR "
          name="input"
          type="text"
          value={value}
          onChange={event => onChange(event.target)}
        />
        <div className="input_label">Input task title here</div>
      </label>
    </div>
  );
};

InputArea.propTypes = {
  inputError: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
