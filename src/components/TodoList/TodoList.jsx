import React from 'react';
import propTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export const TodoList = ({ todoList }) => (
  <List>
    {todoList.map(todo => (
      <ListItem
        key={todo.id}
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
  todoList: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      title: propTypes.string.isRequired,
      completed: propTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
};
