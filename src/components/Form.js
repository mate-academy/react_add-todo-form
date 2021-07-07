import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  state = {
    title: '',
    userId: '',
    errorTitle: false,
    errorUser: false,
  }

  handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    this.setState({
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  onSubmit = () => {
    this.setState(({
      title,
      userId,
    }) => {
      const newTodo = {
        title,
        id: +(this.props.id),
        user: this.props.users.find(
          user => user.id === +(this.state.userId),
        ),
      };

      if (!title || !userId) {
        return {
          errorTitle: !title,
          errorUser: !userId,
        };
      }

      this.props.addTodo(newTodo);

      return {
        title: '',
        userId: '',
        errorTitle: false,
        errorUser: false,
      };
    });
  }

  render() {
    const { users } = this.props;
    const { title, errorUser, errorTitle } = this.state;

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
        {errorTitle ? <span>enter a task</span> : ''}

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
        {errorUser ? <span>select User</span> : ''}

        <br />
        <br />

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
