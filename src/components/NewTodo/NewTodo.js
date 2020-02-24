import React from 'react';
import './NewTodo.css';
import PropTypes from 'prop-types';

export class NewTodo extends React.Component {
   state = {
     tempInputValue: '',
     tempSelectValue: 0,
     errors: {
       isErrorInput: false,
       isErrorSelect: false,
     },
   }

  handlerSubmit = (event) => {
    event.preventDefault();
    let isInputValidate = false;
    let isSelectValidate = false;

    if (this.state.tempSelectValue !== 0) {
      isSelectValidate = true;
    }

    if (this.state.tempInputValue.trim() !== '') {
      isInputValidate = true;
    }

    if (isInputValidate && isSelectValidate) {
      const newTodo = {
        title: this.state.tempInputValue,
        userId: this.state.tempSelectValue,
        completed: false,
        id: this.props.todos.reduce(
          (acc, item) => (item.id >= acc ? item.id + 1 : acc), 0,
        ),
      };

      this.props.handler(newTodo);

      this.setState({
        errors: {
          isErrorInput: false,
          isErrorSelect: false,
        },
        tempInputValue: '',
        tempSelectValue: 0,
      });
    } else {
      this.setState({
        errors: {
          isErrorInput: !isInputValidate,
          isErrorSelect: !isSelectValidate,
        },
      });
    }
  }

  handlerInput = (event) => {
    this.setState({
      tempInputValue: event.target.value.replace(/[^\s\w]/g, ''),
      errors: { isErrorInput: false },
    });
  }

  handlerSelect = (event) => {
    this.setState({
      tempSelectValue: +event.target.value,
      errors: { isErrorSelect: false },
    });
  }

  render() {
    return (
      <>
        <form className="new-todo" onSubmit={this.handlerSubmit}>
          <fieldset className="new-todo__legend">
            <legend>Add new task</legend>
            <fieldset>
              <label htmlFor="title">Task:</label>
              <div>
                <input
                  id="title"
                  type="text"
                  placeholder="task"
                  onChange={this.handlerInput}
                  value={this.state.tempInputValue}
                  maxLength={25}
                />
                <span className="error">
                  {this.state.errors.isErrorInput
                    ? '!!! Please enter the task'
                    : ''
                  }
                </span>
              </div>
            </fieldset>
            <fieldset>
              <label htmlFor="person">Responsible Person:</label>
              <div>
                <select
                  id="person"
                  value={this.state.tempSelectValue}
                  onChange={this.handlerSelect}
                >
                  <option key={0} value={0}>select persone</option>
                  {this.props.users.map(user => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                  ))}
                </select>
                <span className="error">
                  {this.state.errors.isErrorSelect
                    ? '!!! Please choose a user'
                    : ''
                  }
                </span>
              </div>
            </fieldset>
            <button type="submit">Add task</button>
          </fieldset>
        </form>
      </>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  handler: PropTypes.func.isRequired,

};
