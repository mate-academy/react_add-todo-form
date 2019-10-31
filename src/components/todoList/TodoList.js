import React, { Component } from 'react';
import { GridColumn, GridRow, Table } from 'semantic-ui-react';
import NewTodo from '../newTodo/NewTodo';
import TodoItem from '../todoItem/TodoItem';
import todos from '../../api/todos';
import users from '../../api/users';

class TodoList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoList: [],
    };

    this.getNewTodo = this.getNewTodo.bind(this);
  }

  componentDidMount() {
    this.setState({
      todoList: todos.map(todo => ({
        ...todo,
        user: users.find(user => user.id === todo.userId),
      })),
    });
  }

  getNewTodo(todoTitle, userId) {
    this.setState(prevState => ({
      todoList: [
        ...prevState.todoList,
        {
          title: todoTitle,
          user: users.find(user => user.id === userId),
          id: prevState.todoList.length + 1,
          completed: false,
        }],
    }));
  }

  render() {
    return (
      <>
        <NewTodo onFormSubmit={this.getNewTodo} />
        <GridRow>
          <GridColumn>
            <Table selectable>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell width="1">Status</Table.HeaderCell>
                  <Table.HeaderCell width="4">Name</Table.HeaderCell>
                  <Table.HeaderCell>Task</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {this.state.todoList.map(todo => (
                  <TodoItem key={todo.id} item={todo} />
                ))}
              </Table.Body>
            </Table>
          </GridColumn>
        </GridRow>
      </>
    );
  }
}

export default TodoList;
