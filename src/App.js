import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card } from 'react-bootstrap';

import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';
import users from './api/users';
import todos from './api/todos';

const prepearedTodos = todos.map(todo => ({
  id: todo.id,
  title: todo.title,
  name: users.find(user => user.id === todo.id).name,
}));

export default class App extends Component {
  state={
    todoList: [...prepearedTodos],
    userList: [...users],
  }

  addUser = (name, title) => {
    this.setState((prevState) => {
      const newUser = {
        id: prevState.todoList.length + 1,
        title,
        name,
      };

      return {
        todoList: [...prevState.todoList, newUser],
      };
    });
  }

  render() {
    return (
      <div className="App">
        <Card>
          <Card.Body>
            <TodoList todoList={this.state.todoList} />
            <TodoForm
              userList={this.state.userList}
              onAdd={this.addUser}
            />
          </Card.Body>
        </Card>

      </div>
    );
  }
}
