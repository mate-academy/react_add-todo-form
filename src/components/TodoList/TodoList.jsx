import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';
import { Todo } from '../Todo';

export const TodoList = React.memo(
  ({ todos }) => (
    <List>
      {todos.map(todo => (
        <List.Item key={todo.id}>
          <Todo todo={todo} />
        </List.Item>
      ))}
    </List>
  ),
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

TodoList.defaultProps = {
  todos: [],
};
