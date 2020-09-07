import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  state = {
    title: '',
    userId: '',
    errorMessage: '',
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    this.setState({
      [name]: type === 'checkbox' ? checked : value,
      errorMessage: '',
    });
  };

  onSubmit = () => {
    this.setState(state => ({
      ...state,
      userId: '',
      title: '',
      errorMessage: '',
    }));

    if (!this.state.title) {
      this.setState({
        errorMessage: 'please enter the task',
      });

      return;
    }

    if (!this.state.userId) {
      this.setState({
        errorMessage: 'please select a user',
      });

      return;
    }

    const newTodo = {
      ...this.state,
      id: +(this.props.id),
      user: this.props.users.find(user => user.id === +(this.state.userId)),
    };

    this.props.addTodo(newTodo);
  }

  render() {
    const { users } = this.props;
    const { title } = this.state;

    return (
      <div>
        <h2>Form</h2>
        <input
          type="text"
          name="title"
          placeholder="Add a task"
          value={title}
          onChange={this.handleChange}
        />

        <br />
        <br />

        <select
          name="userId"
          value={this.state.userId}
          onChange={this.handleChange}
        >
          <option value="">
            Choose a person
          </option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <br />
        <br />

        <div>{this.state.errorMessage}</div>

        <button
          type="submit"
          onClick={this.onSubmit}
        >
          Add
        </button>
        <hr />
      </div>
    );
  }
}

export default Form;

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};
