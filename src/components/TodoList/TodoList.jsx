import React from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const TodoList = ({ todos }) => (
  <List>
    {todos.map(todo => (
      <ListItem
        key={uuidv4()}
      >
        <ListItemText>
          {todo.user.name}
        </ListItemText>
        <ListItemText>
          {todo.title}
        </ListItemText>
        <ListItemText>
          {todo.completed ? 'Done!' : 'Pending...'}
        </ListItemText>
      </ListItem>
    ))}
  </List>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf({
    userId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    }),
  }).isRequired,
};
