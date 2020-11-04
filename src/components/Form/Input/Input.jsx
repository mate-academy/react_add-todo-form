import React from 'react';
import propTypes from 'prop-types';

export const Input = ({ title, titleMessage, onChange }) => (
  <label>
    Title
    <input
      className="input"
      type="text"
      name="title"
      value={title}
      onChange={onChange}
    />
    {titleMessage ? <p className="message">{titleMessage}</p> : ''}
  </label>
);

Input.propTypes = {
  title: propTypes.string.isRequired,
  titleMessage: propTypes.string.isRequired,
  onChange: propTypes.func.isRequired,
};
