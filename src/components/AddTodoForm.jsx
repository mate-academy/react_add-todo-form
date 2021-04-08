import React from 'react';
import users from '../api/users';
import './addTodoForm.css'
import PropTypes from 'prop-types';

export class AddTodoForm extends React.Component {
  state = {
    newTodoTitle: '',
    selectedNameId: 0,
    hasSelectError: false,
    hasTitleError: false,
  }

  handleTitleChange = (event) => {
    this.setState({
      newTodoTitle: event.target.value,
      hasTitleError: false,
    });
  }

  handleNameChange = (event) => {
    this.setState({
      selectedNameId: +event.target.value,
      hasSelectError: false,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { newTodoTitle, selectedNameId } = this.state;

    if (!newTodoTitle || !selectedNameId) {
      this.setState({
        hasSelectError: !selectedNameId,
        hasTitleError: !newTodoTitle,
      });

      return;
    }

    this.props.addTodo(newTodoTitle, selectedNameId);

    this.setState({
      newTodoTitle: '',
      selectedNameId: 0,
    });
  }

  render() {
    const { newTodoTitle, selectedNameId, hasSelectError, hasTitleError } = this.state;

    return(

      <form className="form" onSubmit={this.handleFormSubmit}>

        <div className="input">
          <input
            type="text"
            value={newTodoTitle}
            placeholder="Enter the title"
            onChange={this.handleTitleChange}
          />
          {hasTitleError && (
            <div className="error">Please enter the title</div>
          )}
        </div>

        <div className="select">
          <select
            value={selectedNameId}
            onChange={this.handleNameChange}
          >
            <option value="0">Please choose a user</option>

            {users.map(({ id, name }) => (
              <option
                key={id}
                value={id}
              >
                {name}
              </option>
            ))}
          </select>
          {hasSelectError && (
            <div className="error">Choose a name</div>
          )}
        </div>

        <button className="btn btn-success" type="submit">Add</button>

      </form>
    )
  }
}

AddTodoForm.propTypes = {
    addTodo: PropTypes.func.isRequired,
}
