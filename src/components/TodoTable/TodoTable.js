import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import Todo from '../todo/Todo';


class TodoTable extends React.Component {
  render() {
    const { todos } = this.props;

    return (
      <Table unstackable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell textAlign='right'>Todo</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {todos.map(todo => <Todo todo={todo} key={todo.id}/>)}
        </Table.Body>
      </Table>
    )
  }
}

TodoTable.propTypes = {
  todos: PropTypes.array.isRequired,
}

export default TodoTable;
