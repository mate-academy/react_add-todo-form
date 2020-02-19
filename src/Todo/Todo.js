import React from 'react';
import PropTypes from 'prop-types';
import './Todo.css';

const Todo = ({ id, title }) => (
  <>
    <p className="card__id">{`ID: ${id}`}</p>
    <p className="card__title">{`TODO: ${title}`}</p>
  </>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
};

export default Todo;
