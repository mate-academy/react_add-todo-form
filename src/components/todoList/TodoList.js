import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import TodoItem from '../todoItem/TodoItem';

class TodoList extends PureComponent {
  render() {
    const { todosWithUser } = this.props;

    return (
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Todo item</Table.HeaderCell>
            <Table.HeaderCell>User name</Table.HeaderCell>
            <Table.HeaderCell>Is completed</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {todosWithUser.map(todo => (
            <TodoItem
              key={todo.id}
              title={todo.title}
              isCompleted={todo.completed}
              user={todo.user}
            />
          ))}
        </Table.Body>
      </Table>
    );
  }
}

TodoList.propTypes = {
  todosWithUser: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default TodoList;
