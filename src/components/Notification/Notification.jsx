import React from 'react';
import PropTypes from 'prop-types';
import './Notification.css';

export const Notification = ({ notifSelect }) => (
  <div className="notification">
    <span className="notification__text">{notifSelect}</span>
  </div>
);

Notification.propTypes = PropTypes.string.isRequired;
