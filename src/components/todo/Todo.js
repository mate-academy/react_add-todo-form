import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';


class Todo extends React.Component {
  render() {
    const { todo } = this.props;

    return (
      <Table.Row>
        <Table.Cell>{todo.id}</Table.Cell>
        <Table.Cell>{todo.name}</Table.Cell>
        <Table.Cell textAlign='right'>{todo.title}</Table.Cell>
      </Table.Row>
    )
  }
}

Todo.propTypes = {
  todo: PropTypes.object.isRequired,
}

export default Todo;
