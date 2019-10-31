import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Table } from 'semantic-ui-react';

const TodoItem = (props) => {
  const { user, title, completed } = props.item;

  return (
    <Table.Row>
      <Table.Cell>
        {
          completed
            ? <Icon name="check circle outline" color="green" size="big" />
            : <Icon name="circle outline" color="grey" size="big" />
        }

      </Table.Cell>
      <Table.Cell>{user.name}</Table.Cell>
      <Table.Cell>{title}</Table.Cell>
    </Table.Row>
  );
};

TodoItem.propTypes = {
  item: PropTypes.shape({
    user: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
};

export default TodoItem;
