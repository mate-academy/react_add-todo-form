import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export const Todo = ({ title, completed, user }) => (
  <li>
    <Card style={{ width: '22rem' }}>
      <Card.Body>
        <Card.Title>
          {title}
        </Card.Title>
        <Card.Subtitle>
          {completed ? 'completed' : 'not completed'}
        </Card.Subtitle>
        <Card.Text>
          {user.name}
        </Card.Text>
      </Card.Body>
    </Card>
  </li>
);

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  user: PropTypes.arrayOf(PropTypes.object).isRequired,
  completed: PropTypes.bool,
};

Todo.defaultProps = {
  completed: false,
};
