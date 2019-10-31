import React, {Component} from 'react';
import { Table } from 'semantic-ui-react';

class TodoItem extends Component {
  render() {
    const { title, completed} = this.props;
    const userName = this.props.user.name;

    return (
      <Table.Row>
        <Table.Cell><span>{title}</span></Table.Cell>
        <Table.Cell><span>{userName}</span></Table.Cell>
        {completed ? (
          <Table.Cell positive>
            <span role="img" aria-labelledby="positive">&#128077;</span>
          </Table.Cell>
        ) : (
          <Table.Cell negative>
            <span role="img" aria-labelledby="positive">&#9940;</span>
          </Table.Cell>
        )}
      </Table.Row>
    );
  }
}
export default TodoItem;
