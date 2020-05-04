/* eslint-disable react/prop-types */
import React from 'react';

const FormError = (props) => {
  const errors = props;

  return (
    <div hidden={errors.isValidated}>
      <p>{errors.userSelectionError}</p>
      <p>{errors.toDoInputError}</p>
    </div>
  );
};

export default FormError;
