import React from 'react';
import './App.css';

import users from './api/users';
import { Form } from './api/components/Form';
import { TodoList } from './api/components/TodoList';

export class App extends React.Component {
  state ={
    todoList: [],
    title: '',
    userName: '',
    classValidTitle: '',
    classValidUser: '',
  }

  userNameHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value, classValidTitle: '', classValidUser: '',
    });
  }

  addUserHandler = (e) => {
    e.preventDefault();

    if (!this.state.userName) {
      this.setState({ classValidUser: 'showUser' });

      return;
    }

    if (!this.state.title) {
      this.setState({ classValidTitle: 'showTitle' });

      return;
    }

    this.setState(state => ({ todoList: [...state.todoList, {
      title: state.title,
      name: state.userName,
      id: state.todoList.length + 1,
    }] }));

    this.setState({
      title: '', userName: '',
    });
  }

  render() {
    return (
      <div className="App">
        <Form
          users={users}
          userNameHandler={this.userNameHandler}
          addUserHandler={this.addUserHandler}
          valueTitle={this.state.title}
          valueUser={this.state.userName}
          classValidTitle={this.state.classValidTitle}
          classValidUser={this.state.classValidUser}
        />
        <TodoList todoList={this.state.todoList} />
      </div>
    );
  }
}

export default App;
