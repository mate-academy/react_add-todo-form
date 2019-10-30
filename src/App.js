import React, { Component } from 'react';
import users from './api/users';
import todos from './api/todos';
import ToDoList from './component/ToDoList';
import NewToDo from './component/NewToDo/NewToDo';

export default class App extends Component {

  state = {
    todolist: [...todos],
    users: [...users],
    currentUser: 0,
    currentValue: '',
    isCurrentUserValid: null,
    isValidToDo: null
  }

  selectUser = (event) => {
    const userIndex = event.target.value;
    this.setState(({prevState}) => {
      if (+userIndex === 0) {
        return {
          ...prevState,
          currentUser: +userIndex,
          isCurrentUserValid: false
        }
      }
      return {
        ...prevState,
        currentUser: userIndex,
        isCurrentUserValid: true,
      }
    })
  }

  onChangeInput = (event) => {
    const inputValue = event.target.value;
    this.setState(({prevState}) => {
      return {
        ...prevState,
        currentValue: inputValue,
        isValidToDo: null
      }
    })
  }

  addItem = (event) => {
    event.preventDefault();
    if (!this.state.isCurrentUserValid) return;
    if (!this.state.currentValue.match(/\w/g)) {
      this.setState(({prevState}) => {
        return {
          ...prevState,
          isValidToDo: false,
          currentValue: ''
        }
      })
      return;
    }

    const newToDo = {
      userId: +this.state.currentUser,
      title: this.state.currentValue,
      completed: this.state.currentValue === 'todo nothing' ? true : false,
      id: Math.max(...this.state.todolist.map(todo => todo.id)) + 1
    }
    this.setState(({prevState}) => {
      return {
        ...prevState,
        todolist: [...this.state.todolist, newToDo],
        currentValue: '',
      }
    })
  }

  render() {
    return (
      <div className="App col-sm-10">
        <ToDoList users={this.state.users} todos={this.state.todolist} />
        <NewToDo users={this.state.users}
        select={this.selectUser}
        changeInput={this.onChangeInput}
        addItem={this.addItem} value={this.state.currentValue}
        valid={this.state.isCurrentUserValid}
        isValidToDo={this.state.isValidToDo}/>
      </div>
    );
  }
}
