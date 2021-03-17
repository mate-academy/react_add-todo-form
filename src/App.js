import React from 'react';
import { Form } from './component/Form';
import { TodoList } from './component/TodoList';
import './App.css';

import users from './api/users';
import todos from './api/todos';

const todoFromServer = todos.map(todo => ({
  ...todo,
  user: users.find(user => user.id === todo.userId),
}));

export class App extends React.Component {
  state = {
    todos: todoFromServer,
    selectedUserId: 0,
    title: '',
    isTitleWritten: false,
    isUserWritten: false,
  }

  changeTitleHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      isTitleWritten: false,
    });
  }

  selectUserHandler = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: +value,
      isUserWritten: false,
    });
  }

  addTodo = (event) => {
    const { title, selectedUserId, isTitleWritten, isUserWritten } = this.state;

    event.preventDefault();

    if (!title || selectedUserId === 0) {
      this.setState({
        isTitleWritten: !isTitleWritten,
        isUserWritten: isUserWritten !== 0,
      });

      return;
    }

    this.setState((state) => {
      const newTodo = {
        id: state.todos.length + 1,
        title,
        completed: false,
        userId: selectedUserId,
        user: users.find(user => user.id === selectedUserId),
      };

      return ({
        selectedUserId: 0,
        title: '',
        todos: [...state.todos, newTodo],
      });
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Add todo form</h1>
        <Form
          users={users}
          addTodo={this.addTodo}
          changeTitleHandler={this.changeTitleHandler}
          selectUserHandler={this.selectUserHandler}
          selectedUserId={this.state.selectedUserId}
          title={this.state.title}
          isTitleWritten={this.state.isTitleWritten}
          isUserWritten={this.state.isUserWritten}
        />
        <TodoList todos={this.state.todos} />
        {this.state.isTitleWritten && (
          <div className="isTitleWritten">Dude, write some title</div>
        )}
        {this.state.isUserWritten && (
          <div className="isUserWritten">Mate, u didnt choose user</div>
        )}
      </div>
    );
  }
}

export default App;
