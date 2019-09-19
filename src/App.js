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
    usersSelected: users,
    selectUser: '',
    taskUser: '',
    errorWhithOutUser: '',
    errorWhithOutTasks: '',
    names: usersList.map(item => item.user.name),
    tasks: usersList.map(item => item.title),
    id: usersList.length,
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
    if ((this.state.taskUser.length === 0 || this.state.taskUser === ' ') && this.state.selectUser.length < 3) {
      this.setState({
        errorWhithOutTasks: 'required to fill in the field',
        errorWhithOutUser: 'required to fill in the field',
      });
    } else if (this.state.selectUser.length < 3) {
      this.setState({
        errorWhithOutUser: 'required to fill in the field',
      });
    } else if (this.state.taskUser.length === 0 || this.state.taskUser === ' ') {
      this.setState({
        errorWhithOutTasks: 'required to fill in the field',
      });
    } else if (this.state.taskUser.length > 0 && this.state.selectUser.length > 3) {
      this.setState(prevState => ({
        tasks: [...prevState.tasks, prevState.taskUser],
        names: [...prevState.names, prevState.selectUser],
        id: prevState.id + 1,
        selectUser: '',
        taskUser: '',
        errorWhithOutUser: '',
        errorWhithOutTasks: '',
      }));
    }
  };

  render() {
    return (
      <div className="App">
          {console.log(usersList, this.state.id)}

        <h1>Static list of todos</h1>
        <span>ToDo: </span>
        <form onSubmit={this.buttonClick}>
          <input type="text" onChange={this.addToDo} value={this.state.taskUser} placeholder={this.state.errorWhithOutTasks} />
          <p>
            <span>Users:</span>
            <select onChange={this.addUser} value={this.state.selectUser}>
              <option>...</option>
              {this.state.usersSelected.map(item => <option>{item.name}</option>)}
            </select>
            <p className="error">{this.state.errorWhithOutUser}</p>
            <button type="submit">
              Add
            </button>
          </p>
        </form>
        <div>
          {this.state.tasks.map((item, index) =>
          <div>
            <span><strong> Task: </strong> {item}</span>
            <span><strong> Name: </strong>{this.state.names[index]}</span>
            <span><strong> ID: {index+1}</strong></span>
          </div>)}
        </div>
      </div>
    );
  }
}

export default App;
