import React from 'react';
import { Select } from '../Select&Option/Select';
import { ShapeNewTodo } from '../Shapes/Shapes';

export class NewTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDisabled: true,
      userWasSelected: false,
      nameWasEntered: false,
      showErrorTodo: false,
      selectedUser: '0',
      todoToAdd: '',
    };
  }

  selectUser = value => (this.setState(prevState => ({
    selectedUser: value,
    userWasSelected: true,
    isDisabled: !prevState.nameWasEntered,
  })))

  onSubmit = (ev) => {
    ev.preventDefault();

    const todo = {
      name: this.state.todoToAdd,
      userId: this.props.usersNames.find(
        user => user.name === this.state.selectedUser,
      ).id,
      id: this.props.id,
      done: false,
    };

    this.props.addTodo(todo);

    return (
      this.setState(() => ({
        todoToAdd: '',
        selectedUser: '0',
        isDisabled: true,
      })));
  }

  changedInput = value => (this.setState(() => ({
    todoToAdd: value,
    showErrorTodo: false,
  })))

  onBlur = (value) => {
    if (value.length > 4) {
      return (this.setState(prevState => ({
        nameWasEntered: true,
        isDisabled: !prevState.userWasSelected,
      })));
    }

    return (this.setState(() => ({
      showErrorTodo: true,
    })));
  }

  render() {
    const {
      selectedUser, todoToAdd, isDisabled,
      showErrorTodo, showErrorSelect,
    } = this.state;

    const { usersNames } = this.props;

    return (
      <form className="Form" onSubmit={ev => this.onSubmit(ev)}>
        <input
          className="input-text"
          placeholder="Add TODO"
          type="text"
          name="added_todo"
          value={todoToAdd}
          onChange={ev => this.changedInput(ev.target.value)}
          onBlur={ev => this.onBlur(ev.target.value)}
        />
        {
          (showErrorTodo)
            ? (
              <p className="Error">
                Enter todo please, min length is 5 chars
              </p>
            )
            : <></>
        }

        <Select
          toSelect={this.selectUser}
          selected={selectedUser}
          users={usersNames}
        />
        {
          (showErrorSelect)
            ? <p className="Error">Choose the user please</p>
            : <></>
        }
        <input
          className="btn"
          type="submit"
          name="but"
          value="ADD NEW TODO"
          disabled={isDisabled}
        />
      </form>
    );
  }
}

NewTodo.propTypes = ShapeNewTodo.isRequired;
