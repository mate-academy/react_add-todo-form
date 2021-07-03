import React from 'react';
import PropTypes from 'prop-types';

class NewTodo extends React.Component {
  state = {
    id: 3,
    title: '',
    userId: 0,
    errorInput: false,
    errorSelect: false,
  }

  selectUser = (event) => {
    this.setState({
      userId: +event.target.value,
      errorSelect: false,
    });
  }

  handleChangeInput = (event) => {
    this.setState({
      title: event.target.value,
      errorInput: false,
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { id, title, userId } = this.state;
    const { addTodo } = this.props;

    if (title && userId) {
      addTodo(id, title, userId);

      this.setState({
        id: id + 1,
        title: '',
        userId: 0,
        errorInput: false,
        errorSelect: false,
      });
    }

    if (!title || title.trim().length === 0) {
      this.setState({
        errorInput: true,
      });
    }

    if (!userId) {
      this.setState({
        errorSelect: true,
      });
    }
  }

  render() {
    const { users } = this.props;
    const { title, userId, errorInput, errorSelect } = this.state;
    let errorMessageInput;
    let errorMessageSelect;

    if (!errorInput) {
      errorMessageInput = '';
    } else {
      errorMessageInput = 'Please enter the correct title';
    }

    if (!errorSelect) {
      errorMessageSelect = '';
    } else {
      errorMessageSelect = 'Please choose a user';
    }

    return (
      <div className="container-fluid">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Please enter the title of todo"
              className="form-control"
              aria-describedby="inputText"
              value={title}
              onChange={this.handleChangeInput}
            />
            <small id="inputText" className="form-text text-danger">
              {errorMessageInput}
            </small>
          </div>
          <div className="form-group">
            <select
              onChange={this.selectUser}
              value={userId}
              className="selectbox"
              aria-describedby="selectVal"
            >
              <option disabled value="0">
                Choose a User
              </option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.name}</option>
              ))}
            </select>
            <small id="selectVal" className="form-text text-danger">
              {errorMessageSelect}
            </small>
          </div>
          <button type="submit" className="btn btn-success">Add</button>
        </form>
      </div>
    );
  }
}

NewTodo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
