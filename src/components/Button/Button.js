import React from 'react';
import { ButtonShapes } from '../../Shapes';
import './Button.css';

export const Button = ({ buttonName }) => (
  <button
    type="submit"
    className="btn btn-primary"
  >
    {buttonName}
  </button>
);

Button.propTypes = ButtonShapes.isRequired;
