import React from 'react';
import PropTypes from 'prop-types';

import users from '../api/users';

class NewTodo extends React.Component {
  state = {
    selectedExecutant: 0,
    newTodoTitle: '',
    titleError: false,
    executantError: false,
  }

  handleExecutantChange = (event) => {
    const { value } = event.target;

    this.setState({
      executantError: false,
      selectedExecutant: value,
    });
  }

  handleNewTodoTitleChange = (event) => {
    const { value } = event.target;

    this.setState({
      titleError: false,
      newTodoTitle: value,
    });
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    const { newTodoTitle, selectedExecutant } = this.state;

    if (!newTodoTitle || !selectedExecutant) {
      this.setState({
        titleError: !newTodoTitle,
        executantError: !selectedExecutant,
      });

      return;
    }

    if (newTodoTitle.trim() === '') {
      this.setState({ titleError: true });

      return;
    }

    this.props.updateTodosList(newTodoTitle, selectedExecutant);
    this.clearState();
  }

  clearState = () => {
    this.setState({
      selectedExecutant: 0,
      newTodoTitle: '',
    });
  };

  handleFormReset = () => {
    this.setState({
      selectedExecutant: 0,
      newTodoTitle: '',
      titleError: false,
      executantError: false,
    });
  }

  render() {
    const {
      selectedExecutant,
      newTodoTitle,
      titleError,
      executantError,
    } = this.state;

    return (
      <>
        <div className="todoForm">
          <h1>Add todo form</h1>
          <form onSubmit={this.handleFormSubmit}>
            <label className="todoForm__element">
              <span>Title : </span>
              <input
                type="text"
                value={newTodoTitle}
                placeholder="Add todo title"
                onChange={this.handleNewTodoTitleChange}
              />
              {titleError && (
                <span className="error">Please enter a title</span>
              )}
            </label>
            <label className="todoForm__element">
              <span>Select executant : </span>
              <select
                className="button select"
                value={selectedExecutant}
                onChange={this.handleExecutantChange}
              >
                <option value="0" hidden>Please select executant</option>

                {users.map(({ name, id }) => (
                  <option value={id} key={id}>
                    {name}
                  </option>
                ))}
              </select>
              {executantError && (
                <span className="error">Please select executant</span>
              )}
            </label>
            <button
              type="submit"
              className="todoForm__button todoForm__btn-submit"
            >
              Add Todo
            </button>
            <button
              type="button"
              onClick={this.HandleFormReset}
              className="todoForm__button todoForm__btn-reset"
            >
              Reset
            </button>
          </form>
        </div>
      </>
    );
  }
}

NewTodo.propTypes = {
  updateTodosList: PropTypes.func.isRequired,
};

export default NewTodo;
