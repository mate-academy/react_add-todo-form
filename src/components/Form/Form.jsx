import React from 'react';
import PropType from 'prop-types';
import { userType } from '../propTypes/userType';

export class Form extends React.PureComponent {
  state = {
    title: '',
    userId: 0,
    errorMessage: '',
    error: false,
  };

  handleChange = (event) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
      error: false,
      errorMessage: '',
    });
  }

  onSubmit = (event) => {
    const { title, userId } = this.state;
    const { addTodo } = this.props;

    event.preventDefault();

    if (!title.trim()) {
      this.setState({
        errorMessage: 'Enter the title',
        error: true,
      });
    }

    if (!userId) {
      this.setState({
        errorMessage: 'Chose somebody',
        error: true,
      });
    }

    addTodo(title, userId);

    if (userId && title) {
      this.setState({
        title: '',
        userId: 0,
        error: false,
        errorMessage: '',
      });
    }
  }

  render() {
    const {
      title,
      userId,
      errorMessage,
      error,
    } = this.state;

    return (
      <>
        <form
          action=""
          className="my-4 "
          onSubmit={this.onSubmit}
        >
          {/* eslint-disable-next-line */}
          <div className="d-flex justify-content-center flex-column w-50 mx-auto my-2">
            <label className="text-light">
              <input
                className="form-control m-auto"
                type="text"
                name="title"
                placeholder="Add a new todo..."
                value={title}
                onChange={this.handleChange}
              />
            </label>

            <select
              name="userId"
              className="form-control w-50 mx-auto"
              value={userId}
              onChange={this.handleChange}
            >
              <option>Choose your hero</option>
              {this.props.users.map(user => (
                <option key={user.id} value={+user.id}>{user.name}</option>
              ))}
            </select>
          </div>

          {/* eslint-disable-next-line */}
          {error && <p className="text-danger">{errorMessage}</p>}

          <div>
            <button type="submit" className="btn btn-light">
              Add
            </button>
          </div>
        </form>
      </>
    );
  }
}

Form.propTypes = {
  users: PropType.arrayOf(PropType.shape(userType)).isRequired,
  addTodo: PropType.func.isRequired,
};
