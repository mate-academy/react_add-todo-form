import React from 'react';
import { Table } from 'semantic-ui-react';
import TodoItem from '../todoItem/TodoItem';

class TodoList extends React.Component {
  render() {
    const { todosData} = this.props;

    return (
      <div>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell><span>Item</span></Table.HeaderCell>
              <Table.HeaderCell><span>Name</span></Table.HeaderCell>
              <Table.HeaderCell><span>Is completed</span></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {todosData.map(todo => (
              <TodoItem
                key={todo.id}
                title={todo.title}
                isCompleted={todo.completed}
                user={todo.user}
              />
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

export default TodoList;
