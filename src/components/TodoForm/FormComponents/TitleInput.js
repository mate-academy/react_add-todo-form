import React from 'react';
import PropTypes from 'prop-types';

export const TitleInput = ({ title, handleChange, titleError }) => (

  <div className="form__title">
    <input
      type="text"
      placeholder="Todo..."
      className="form__input"
      name="title"
      value={title}
      onChange={handleChange}
    />
    {titleError
      && <p className="form__error">Please enter the title</p>}
  </div>
);

TitleInput.propTypes = {
  title: PropTypes.string.isRequired,
  titleError: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
};
