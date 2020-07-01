import React from 'react';
import './Button.css';
import { ButtonTypes } from '../Shape/ShapeTypes';

export const Button = () => (
  <button
    className="btn btn-success"
    type="submit"
  >
    Add
  </button>
);

Button.propTypes = ButtonTypes;
