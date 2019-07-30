import React from 'react';
import PropTypes from 'prop-types';

const FormError = ({ errors }) => (
  <ul className="errors">
    {
      errors.map(error => (
        <li key={error} className="errors__item">{error}</li>
      ))
    }
  </ul>
);

FormError.propTypes = {
  errors: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FormError;
