import React from 'react';
import { NewTodoTypes } from '../Shapes/ShapesTypes';

import { UserSelect } from '../UserSelect/UserSelect';
import { Button } from '../Button/Button';

export class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titleOfTask: '',
      userId: '',
      isValid: false,
      errorMessage: '',
    };
  }

  getTitleOfTask = (event) => {
    const task = event.target.value.replace(/\s/, ' ').replace(/^\s/, '');

    this.setState({
      titleOfTask: task,
      isValid: false,
    });
  }

  getUserId = (event) => {
    const id = event.target.value;

    this.setState({
      userId: id,
      isValid: false,
    });
  }

  onSubmit = (event) => {
    event.preventDefault();

    if (!this.state.titleOfTask && !this.state.userId) {
      this.setState({
        errorMessage: 'Please type correct data',
      });
    } else if (!this.state.titleOfTask && this.state.userId) {
      this.setState({
        errorMessage: 'Please enter the title',
      });
    } else if (this.state.titleOfTask && !this.state.userId) {
      this.setState({
        errorMessage: 'Please choose a user',
      });
    }

    if (!this.state.titleOfTask || !this.state.userId) {
      this.setState({
        isValid: true,
      });

      return;
    }

    event.target.reset();

    const newTask = {
      userId: this.state.userId,
      id: this.props.users + 1,
      title: this.state.titleOfTask,
      completed: false,
    };

    this.props.onNewTodo(newTask);

    this.setState({
      titleOfTask: '',
      userId: '',
    });
  }

  render() {
    const {
      titleOfTask,
      isValid,
      errorMessage,
    } = this.state;

    const { users } = this.props;

    return (
      <form
        className="form"
        onSubmit={this.onSubmit}
      >
        <label className="title-input">
          {isValid
            ? (
              <span className="error">
                {errorMessage}
              </span>
            )
            : ''}
          <input
            className="form-control-lg"
            type="text"
            placeholder="Type task here"
            onChange={this.getTitleOfTask}
            value={titleOfTask}
            maxLength="30"
          />
        </label>
        <UserSelect
          users={users}
          onChangeUser={this.getUserId}
        />
        <Button />
      </form>
    );
  }
}

NewTodo.propTypes = NewTodoTypes;
