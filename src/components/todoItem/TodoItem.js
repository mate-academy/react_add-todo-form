import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';

class TodoItem extends Component {
  render() {
    const { title, completed, user: { name } } = this.props;

    return (
      <Table.Row>
        <Table.Cell><span>{title}</span></Table.Cell>
        <Table.Cell><span>{name}</span></Table.Cell>
        {completed ? (
          <Table.Cell positive>
            <span role="img" aria-labelledby="positive">&#128077;</span>
          </Table.Cell>
        ) : (
          <Table.Cell negative>
            <span role="img" aria-labelledby="negative">&#9940;</span>
          </Table.Cell>
        )}
      </Table.Row>
    );
  }
}
export default TodoItem;
