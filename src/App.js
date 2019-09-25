import React from 'react';

import users from './api/users';
import todos from './api/todos';

import TodoList from './components/TodoList/TodoList';
import TodoForm from './components/TodoForm/TodoForm';

export default class App extends React.Component {
  state = {
    todos,
    users,
    text: '',
    selectedUser: 0,
    isError: false,
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = () => { 
    this.state.text && this.state.selectedUser 
      ? this.setState(prevState => ({
        todos: [...prevState.todos, {
          userId: prevState.selectedUser,
          id: prevState.todos.length + 1,
          title: prevState.text,
          completed: false,
        }],
        text: '',
        selectedUser: 0,
      }))
      : this.setState({
        isError: true,
      }) 
  };

  handleSelect = (event) => {
    this.setState({
      selectedUser: event.target.value,
      isError: false,
    });
  };

  render() {
    const {
      todos,
      users,
      text,
      selectedUser,
      isError} = this.state;

    return (
      <div>
        <TodoForm 
          users={users}
          selectedUser={selectedUser}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          handleSelect={this.handleSelect}
          text={text}
          isError={isError}
        />
        <TodoList
          todos={todos}
        />
      </div>
    );
  }
}
