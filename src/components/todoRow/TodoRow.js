import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';


class TodoRow extends React.Component {
  render() {
    const { id, name, title } = this.props;

    return (
      <Table.Row>
        <Table.Cell textAlign='center'>{id}</Table.Cell>
        <Table.Cell textAlign='center'>{name}</Table.Cell>
        <Table.Cell textAlign='center'>{title}</Table.Cell>
      </Table.Row>
    )
  }
}

TodoRow.propTypes = {
  todo: PropTypes.object.isRequired,
}

export default TodoRow;
