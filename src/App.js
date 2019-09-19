import React from 'react';
import './App.css';

import users from './api/users';
import todos from './api/todos';

function usersListTodo(todosArray, usersArray) {
  return todosArray.map(todo => ({
    ...todo,
    user: usersArray.find(person => person.id === todo.userId),
  }));
}

const usersList = usersListTodo(todos, users);

class App extends React.Component {
  state = {
    // usersToDo: usersList,
    usersSelected: users,
    selectUser: '',
    taskUser: '',
    errorShow: '',
    arrToDo: {
      name: usersList.map(item => item.user.name),
      task: usersList.map(item => item.title),
    },
  };

  addUser = (event) => {
    this.setState({
      selectUser: event.target.value,
    });
  }

  addToDo = (event) => {
    this.setState({
      taskUser: event.target.value,
    });
  }

  buttonClick = (event) => {
    event.preventDefault();
    if (this.state.taskUser.length > 0 && this.state.selectUser.length > 3) {
      this.setState({
        task: this.state.arrToDo.task.push(this.state.taskUser),
        name: this.state.arrToDo.name.push(this.state.selectUser),
        selectUser: '',
        taskUser: '',
        errorShow: '',
      });
    } else {
      this.setState({
        errorShow: 'type or choose',
      });
    }
  };

  render() {

    return (
      <div className="App">
        <h1>Static list of todos</h1>
        <span>ToDo: </span>
        <form onSubmit={this.buttonClick}>
          <input type="text" onChange={this.addToDo} value={this.state.taskUser} />
          <span>{this.state.errorShow}</span>
          <p>
            <span>Users:</span>
            <select onChange={this.addUser} value={this.state.selectUser}>
              <option>...</option>
              {this.state.usersSelected.map(item => <option>{item.name}</option>)}
            </select>
            <span>{this.state.errorShow}</span>
            <button type="submit">
              Add
            </button>
          </p>
        </form>
        <div>
          {this.state.arrToDo.task.map((item, index) => <span><strong> Task: </strong> {item} <br />Name: {this.state.arrToDo.name[index]} <br /> <br /></span>)}
        </div>
      </div>
    );
  }
}

export default App;
