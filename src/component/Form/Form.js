import React from 'react';
import PropType from 'prop-types';
import { UserShape } from '../shapes/userShape';

class NewTodo extends React.Component {
  state = {
    userId: 0,
    id: null,
    title: '',
    completed: false,
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
    });
  }

  onSubmit = (event) => {
    const { userId, title } = this.state;
    const { addTodo } = this.props;

    event.preventDefault();

    addTodo(this.state);

    if (userId && title) {
      this.setState({
        userId: 0,
        title: '',
      });
    }
  }

  render() {
    const { users, error } = this.props;
    const { title, userId } = this.state;

    return (
      <div className="d-flex justify-content-center mb-4">
        <form
          action=""
          onSubmit={this.onSubmit}
          className="w-25"
        >
          <div className="form-group">
            <label>
              Write here new todo
              <input
                type="text"
                name="title"
                placeholder="New Todo"
                className="form-control"
                value={title}
                onChange={this.handleChange}
              />
            </label>
          </div>
          <div>
            <select
              onChange={this.handleChange}
              name="userId"
              className="form-control"
              value={userId}
            >
              <option value={0}>Choose user</option>
              {users
                .map(user => (
                  <option key={user.id} value={+user.id}>{user.name}</option>
                ))}
            </select>
          </div>

          {error && <p className="text-danger">{error}</p>}

          <div>
            <button
              type="submit"
              className="btn btn-success mt-3"
            >
              Add New Todo
            </button>
          </div>
        </form>
      </div>
    );
  }
}

NewTodo.propTypes = {
  users: PropType.arrayOf(PropType.shape(UserShape)).isRequired,
  error: PropType.string,
  addTodo: PropType.func.isRequired,
};

NewTodo.defaultProps = {
  error: '',
};

export default NewTodo;
