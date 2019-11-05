import React from 'react';
import users from '../../api/users';
import Todolist from '../Todolist/Todolist';

class Form extends React.Component {
  state = {
    usersSelected: users,
    selectUser: '',
    taskUser: '',
    error: '',
    name: this.props.listOfUsers.map(item => item.user.name),
    task: this.props.listOfUsers.map(item => item.title),

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
      this.setState(prevState => ({
        name: [...prevState.name, prevState.selectUser],
        task: [...prevState.task, prevState.taskUser],
        selectUser: '',
        taskUser: '',
        error: '',
      }));
      } else {
      this.setState({
        error: 'type task and choose person',
      });
    }
  };

  render() {
    return (
      <form onSubmit={this.buttonClick} className="ui form">
        <input className="field" type="text" onChange={this.addToDo} value={this.state.taskUser} className="input"/>
        <span>{this.state.error}</span>
        <p>
          <span>Users:</span>
          <select
            onChange={this.addUser}
            value={this.state.selectUser}
            role="listbox" aria-expanded="false" className="ui fluid selection dropdown" tabIndex="0">
            <option>Choose a person</option>
            {this.state.usersSelected.map(item => <option>{item.name}</option>)}
          </select>
          <span>{this.state.error}</span>
          <button type="submit" className="ui primary button">
            Add
          </button>
        </p>
        <Todolist state={this.state} />
      </form>

    );
  }
}

export default Form;
