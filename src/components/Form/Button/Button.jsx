import React from 'react';

const Button = () => (
  <button
    type="submit"
    className="form__button"
  >
    Add
  </button>
);

export default React.memo(Button);
