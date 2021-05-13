import React from 'react';
import PropTypes from 'prop-types';
import { User } from '../User';

export const Todo = ({ title, completed, user }) => (
  <>
    <h2>
      {title}
      {' - '}
      <i>
        {completed ? 'true' : 'false'}
      </i>
    </h2>
    <User {...user} />
  </>

);

export const UserType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string,
  address: PropTypes.shape({
    street: PropTypes.string.isRequired,
    suite: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    zipcode: PropTypes.string.isRequired,
    geo: PropTypes.shape({
      lat: PropTypes.string.isRequired,
      lng: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  phone: PropTypes.string.isRequired,
  website: PropTypes.string.isRequired,
  company: PropTypes.shape({
    name: PropTypes.string.isRequired,
    catchPhrase: PropTypes.string.isRequired,
    bs: PropTypes.string.isRequired,
  }).isRequired,
});

Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  user: UserType.isRequired,
};
