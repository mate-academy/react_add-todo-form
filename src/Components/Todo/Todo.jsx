import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';
import './TodoStyle.scss';

export const Todo = ({ id, title, completed, user }) => (
  <>
    <span>
      id:
      {' '}
      {id}
    </span>
    <span>
      Title:
      {' '}
      {title}
    </span>
    <User {...user} />
    <span>
      {' '}
      Completed:
      {' '}
      {`${completed}`}
    </span>
  </>
);

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};
