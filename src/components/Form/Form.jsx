import React from 'react';
import PropType from 'prop-types';
import { userType } from '../propTypes/userType';

export class Form extends React.Component {
  state = {
    title: '',
    userId: 0,
  };

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  onSubmit = (e) => {
    const { title, userId } = this.state;
    const { addTodo } = this.props;

    e.preventDefault();

    addTodo(this.state);

    if (userId && title) {
      this.setState({
        title: '',
        userId: 0,
      });
    }
  }

  render() {
    const { title, userId } = this.state;
    const { users, error } = this.props;

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
              {users.map(user => (
                <option key={user.id} value={+user.id}>{user.name}</option>
              ))}
            </select>
          </div>

          {error && <p className="text-danger">{error}</p>}

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
  error: PropType.string,
  addTodo: PropType.func.isRequired,
};

Form.defaultProps = {
  error: '',
};
