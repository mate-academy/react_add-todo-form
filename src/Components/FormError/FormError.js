/* eslint-disable react/prop-types */
import React from 'react';

const FormError = ({ formErrors }) => (
  <div>
    {Object.keys(formErrors).map((errorField, i) => {
      if (formErrors[errorField].length > 0) {
        return (
          <p>
            {errorField}
            {' '}
            {formErrors[errorField]}
          </p>
        );
      }

      return '';
    })}
  </div>
);

export default FormError;
