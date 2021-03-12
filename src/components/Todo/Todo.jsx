import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import { User } from '../User';

export const Todo = React.memo(
  ({ todo }) => (
    <Card
      link
      header={todo.title}
      meta={todo.completed.toString()}
      description={<User user={todo.user} />}
    />
  ),
);

Todo.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
