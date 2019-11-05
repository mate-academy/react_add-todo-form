import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'semantic-ui-react';

const TodoItem = ({ title, isCompleted, user: { name } }) => {

  return (
    <Table.Row>
      <Table.Cell>{title}</Table.Cell>
      <Table.Cell>{name}</Table.Cell>
      {isCompleted ? (
        <Table.Cell positive>
          <Icon name="checkmark" />
          Completed
        </Table.Cell>
      ) : (
        <Table.Cell negative>
          <Icon name="close" />
          In procces
        </Table.Cell>
      )}
    </Table.Row>
  );
};

TodoItem.propTypes = {
  title: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default TodoItem;
