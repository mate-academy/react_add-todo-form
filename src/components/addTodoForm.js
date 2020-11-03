import React from 'react';
import PropTypes from 'prop-types';
import { SelectUser } from './selectUser';
import { usersProps, todos } from './propsVars';
import 'semantic-ui-css/semantic.min.css';

export class AddTodoForm extends React.Component {
  state = {
    userName: '',
    task: '',
    isNameEntered: false,
    isTaskEntered: false,
  }

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    });
  }

  addTodo = (event) => {
    const {
      userName,
      task,
    } = this.state;

    if (!userName
      || userName === '--choose a User--'
      || !task) {
      if (!userName || userName === '--choose a User--') {
        this.setState({
          isNameEntered: true,
        });
      }

      if (!task) {
        this.setState({
          isTaskEntered: true,
        });
      }

      return;
    }

    const todo = {
      userId: this.props.users.find(user => user.name === userName).id,
      id: this.props.todos.length + 1,
      title: task,
      user: this.props.users.find(user => user.name === userName),
    };

    this.props.changeState(todo);

    this.setState(prev => ({
      userName: '',
      task: '',
      isNameEntered: false,
      isTaskEntered: false,
    }));
  }

  render() {
    const {
      userName,
      task,
      isNameEntered,
      isTaskEntered,
    } = this.state;
    const nameControl = (!userName || userName === '--choose a User--')
      ? isNameEntered
      : false;
    const taskControl = (!task)
      ? isTaskEntered
      : false;

    return (
      <>
        <form className="ui form inverted segment">
          {nameControl && ' Please choose a user ' }
          <br />
          <SelectUser
            users={this.props.users}
            userName={userName}
            handleChange={this.handleChange}
          />
          {taskControl && ' Please enter the title '}
          <textarea
            className="field"
            rows="3"
            placeholder="add new task here"
            name="task"
            value={task}
            onChange={this.handleChange}
          />
          <button
            type="button"
            className="ui inverted fluid white button"
            onClick={this.addTodo}
          >
            add
          </button>
        </form>
      </>
    );
  }
}

AddTodoForm.propTypes = {
  users: usersProps.isRequired,
  changeState: PropTypes.func.isRequired,
  todos: todos.isRequired,
};
