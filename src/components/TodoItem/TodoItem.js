import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ title }) => <>{title}</>;

TodoItem.propTypes = { title: PropTypes.string.isRequired };

TodoItem.defaultProps = {};
