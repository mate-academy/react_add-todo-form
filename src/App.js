import React, { Component } from 'react';

import './App.css';
import todos from './api/todos';
import users from './api/users';

import TodoList from './components/TodoList/TodoList';
import Form from './components/Form/Form';

class App extends Component {
  state = {
    todoList: todos.map(todo => ({
      ...todo,
      user: users.find(user => todo.userId === user.id),
    })),
  }

  handleAddTodo = (todo) => {
    const { selectedUser, title } = todo;

    this.setState(({ todoList }) => ({
      todoList: [
        ...todoList,
        {
          id: todoList.length + 1,
          title: title.value,
          user: users
            .find(user => +selectedUser.value === user.id),
        },
      ],
    }));
  }

  render() {
    const { todoList } = this.state;

    return (
      <div className="App">
        <Form handleAddTodo={this.handleAddTodo} users={users} />
        <TodoList todos={todoList} />
      </div>
    );
  }
}

export default App;
