import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';
import users from './api/users';
import todosFromServer from './api/todos';

const prepearedTodos = todosFromServer.map(todo => ({
  id: todo.id,
  title: todo.title,
  name: users.find(user => user.id === todo.id).name,
}));

export default class App extends Component {
  state={
    todos: [...prepearedTodos],
  }

  addUser = (name, title) => {
    this.setState((prevState) => {
      const newUser = {
        id: prevState.todos.length + 1,
        title,
        name,
      };

      return {
        todos: [...prevState.todos, newUser],
      };
    });
  }

  render() {
    return (
      <div className="App">
        <Card>
          <Card.Body>
            <TodoList todoList={this.state.todos} />
            <TodoForm
              userList={users}
              onAdd={this.addUser}
            />
          </Card.Body>
        </Card>

      </div>
    );
  }
}
