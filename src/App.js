import React from 'react';
import './App.css';
import users from './api/users';
import todos from './api/todos';

function usersListTodo(todosArr, usersArr) {
  return todosArr.map(todo => ({
    ...todo,
    user: usersArr.find(user => user.id === todo.userId),
  }));
}

const listOfUsers = usersListTodo(todos, users);

class App extends React.Component {
  state = {
    usersSelected: users,
    selectUser: '',
    taskUser: '',
    error: '',
    arrayToDo: {
      name: listOfUsers.map(item => item.user.name),
      task: listOfUsers.map(item => item.title),
    },
  };

  addToDo = (event) => {
    this.setState({
      taskUser: event.target.value,
    });
  };

  addUser = (event) => {
    this.setState({
      selectUser: event.target.value,
    });
  };

  buttonClick = (event) => {
    event.preventDefault();
    if (this.state.selectUser.length > 3 && this.state.taskUser.length > 0) {
      this.setState({
        name: this.state.arrayToDo.name.push(this.state.selectUser),
        task: this.state.arrayToDo.task.push(this.state.taskUser),
        selectUser: '',
        taskUser: '',
        error: '',
      });
    } else {
      this.setState({
        error: 'type task and choose person',
      });
    }
  };

  render() {
    return (
      <div className="todo_list">
        <h1>LIST OF TODOS</h1>
        <span>ToDo: </span>
        <form onSubmit={this.buttonClick} class="ui form">
          <input class="field" type="text" onChange={this.addToDo} value={this.state.taskUser} className="input" />
          <span>{this.state.error}</span>
          <p>
            <span>Users:</span>
            <select onChange={this.addUser} value={this.state.selectUser} role="listbox" aria-expanded="false" class="ui fluid selection dropdown" tabindex="0">
              <option>Choose a person</option>
              {this.state.usersSelected.map(item => <option>{item.name}</option>)}
            </select>
            <span>{this.state.error}</span>
            <button type="submit" class="ui primary button">
              Add
            </button>
          </p>
        </form>
        <div className="task_box">
          {this.state.arrayToDo.task.map((item, index) => <span><strong>
            Task: </strong> {item} <br />
            Name: {this.state.arrayToDo.name[index]} <br /> <br /></span>)}
        </div>
      </div>
    );
  }
}

export default App;
