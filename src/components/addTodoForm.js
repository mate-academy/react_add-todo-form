import React from 'react';
import PropTypes from 'prop-types';
import { SelectUser } from './selectUser';
import { usersProps, todos } from './propsVars';
import 'semantic-ui-css/semantic.min.css';

const initialState = {
  userName: '',
  task: '',
  isNoName: false,
  isNoTask: false,
};

export class AddTodoForm extends React.Component {
  state = { ...initialState }

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
          isNoName: true,
        });
      }

      if (!task) {
        this.setState({
          isNoTask: true,
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

    this.props.addTodoCard(todo);

    this.setState({ ...initialState });
  }

  render() {
    const {
      userName,
      task,
      isNoName,
      isNoTask,
    } = this.state;
    const nameControl = (!userName || userName === '--choose a User--')
      ? isNoName
      : false;
    const taskControl = (!task)
      ? isNoTask
      : false;

    return (
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
    );
  }
}

AddTodoForm.propTypes = {
  users: usersProps.isRequired,
  addTodoCard: PropTypes.func.isRequired,
  todos: todos.isRequired,
};
