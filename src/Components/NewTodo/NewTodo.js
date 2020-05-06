import React from 'react';
import PropTypes from 'prop-types';
import './NewTodo.scss';

class NewTodo extends React.Component {
  state = {
    choosenUser: '',
    injectedTodo: '',
    isTaskCompleted: false,
    hasUserError: false,
    hasTaskInputError: false,
  };

  handleSubmit = (e) => {
    const { choosenUser, injectedTodo, isTaskCompleted } = this.state;
    const pattern = /\w+/;
    const injectedTodoIsValid = injectedTodo.match(pattern);

    e.preventDefault();
    if (!choosenUser || !injectedTodoIsValid) {
      this.setState({
        hasUserError: !choosenUser,
        hasTaskInputError: !injectedTodoIsValid,
      });

      return;
    }

    this.props.updateTodosList(injectedTodo, choosenUser, isTaskCompleted);
    this.clearFields();
  };

  handleChosenUser = (event) => {
    this.setState({
      choosenUser: event.target.value,
      hasUserError: false,
    });
  };

  handleTaskInput = (event) => {
    this.setState({
      injectedTodo: event.target.value.trimLeft(),
      hasTaskInputError: false,
    });
  };

  handleTaskStatus = (event) => {
    this.setState({ isTaskCompleted: event.target.checked });
  };

  clearFields = () => {
    this.setState({
      injectedTodo: '',
      choosenUser: '',
      isTaskCompleted: false,
      hasUserError: false,
      hasTaskInputError: false,
    });
  };

  render() {
    const { usersList } = this.props;
    const {
      injectedTodo,
      choosenUser,
      hasUserError,
      hasTaskInputError,
    } = this.state;

    return (
      <>
        <fieldset className="main__form">
          <form onSubmit={this.handleSubmit}>
            <p>
              <label>
                <span>New task</span>
                <input
                  type="text"
                  value={injectedTodo}
                  onChange={this.handleTaskInput}
                  placeholder="Your task (80 symbols max)"
                  className="main__form__fields"
                  maxLength="80"
                />
              </label>
            </p>
            <div className="main__form__errors-wrapper">
              {hasTaskInputError && <em>Please, fill in the field</em>}
            </div>
            <p>
              <label>
                {' '}
                <span>Select a user</span>
                {' '}
                <select
                  value={choosenUser}
                  onChange={this.handleChosenUser}
                  className="main__form__fields"
                >
                  <option value="" disabled>
                    Choose a user
                  </option>
                  {usersList.map(user => (
                    <option value={user.name} key={user.name}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </label>

            </p>
            <div className="main__form__errors-wrapper">
              {hasUserError && <em>Please, select a user</em>}
            </div>
            <p>
              <label>
                Has completed?
                <input
                  type="checkbox"
                  checked={this.state.isTaskCompleted}
                  onChange={this.handleTaskStatus}
                />
              </label>
            </p>
            <input type="submit" value="submit" className="main__form-button" />
          </form>
        </fieldset>
      </>
    );
  }
}

NewTodo.propTypes = {
  updateTodosList: PropTypes.func.isRequired,
  usersList: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

export default NewTodo;
