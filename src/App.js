import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';
import TodoList from './Components/TodoList';
import NewToDo from './Components/NewToDo';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todolist: [...todos],
      users: [...users],
      currentUser: 0,
      currentValue: '',
      isCurrentUserValid: null,
      isValidToDo: null,
      lastId: 3,
    };
  }

  selectUser = (event) => {
    const userIndex = event.target.value;

    this.setState((prevState) => {
      if (+userIndex === 0) {
        return {
          ...prevState,
          currentUser: +userIndex,
          isCurrentUserValid: false,
        };
      }

      return {
        ...prevState,
        currentUser: userIndex,
        isCurrentUserValid: true,
      };
    });
  };

  changeInput = (event) => {
    const { value } = event.target;

    this.setState(PrevState => ({
      ...PrevState,
      currentValue: value,
      isValidToDo: null,
    }));
  };

  addItem = (event) => {
    event.preventDefault();
    if (!this.state.isCurrentUserValid) { return; }

    if (!this.state.currentValue.match(/\w/g)) {
      this.setState(prevState => ({
        ...prevState,
        isValidToDo: false,
        currentValue: '',
      }));
    }

    const newToDo = {
      userId: +this.state.currentUser,
      title: this.state.currentValue,
      completed: this.state.currentValue === 'todo nothing' || this.state.currentValue === 'nothing todo' || this.state.currentValue === 'nothing',
      id: this.state.lastId + 1,
    };

    this.setState(prevState => ({
      ...prevState,
      todolist: [...prevState.todolist, newToDo],
      currentValue: '',
    }));
  };

  render() {
    return (
      <div className="App">
        <NewToDo users={this.state.users} selectUser={this.selectUser} changeInput={this.changeInput} value={this.state.currentValue} valid={this.state.isCurrentUserValid} addItem={this.addItem} />
        <TodoList users={this.state.users} todos={this.state.todolist} />
      </div>
    );
  }
}

export default App;
