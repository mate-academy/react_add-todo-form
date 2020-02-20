import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

export const Modal = ({ onClose, children }) => (
  <div className="alert alert-dismissible alert-danger">
    <button type="button" className="close" onClick={onClose}>&times;</button>
    {children}
  </div>
);

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.string.isRequired,
};
