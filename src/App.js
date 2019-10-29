import React, { Component } from 'react';
import './App.css';
import { Table } from 'semantic-ui-react';
import NewTodo from './components/newTodo/NewTodo';

import users from './api/users';
import todosList from './api/todos';

function getTodosWitsUsers(todoList, userList) {
  return todoList.map(todo => ({
    ...todo,
    user: userList.find(user => user.id === todo.userId),
  }));
}

class App extends Component {
  state = {
    todos: getTodosWitsUsers(todosList, users),
  };

  addTodo = (todo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, todo],
    }));
  };

  render() {
    const { todos } = this.state;

    return (
      <>
        <main>
          <NewTodo
            users={users}
            todos={todos}
            addTodo={this.addTodo}
          />
          <Table celled selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>User</Table.HeaderCell>
                <Table.HeaderCell>Todos</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {todos.map(todo => (
              <Table.Row>
                <Table.Cell>{todo.id}</Table.Cell>
                <Table.Cell>{todo.user.name}</Table.Cell>
                <Table.Cell>{todo.title}</Table.Cell>
                {todo.completed ? (
                  <Table.Cell positive>
                    Completed
                  </Table.Cell>
                ) : (
                  <Table.Cell negative>
                    In progress
                  </Table.Cell>
                )
                }
              </Table.Row>
            ))}
          </Table>
        </main>
      </>
    );
  }
}

export default App;
