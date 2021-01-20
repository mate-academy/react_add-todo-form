import React from 'react';
import PropTypes from 'prop-types';

export class NewTodoForm extends React.PureComponent {
  state = {
    title: '',
    user: '',
    errorUser: false,
    errorTitle: false,
  }

  handleInput = (event) => {
    const { name, value } = event.target;

    this.setState((prevstate) => {
      if (!prevstate.user) {
        this.setState({
          errorUser: false,
        });
      }

      if (!prevstate.title) {
        this.setState({
          errorTitle: false,
        });
      }

      return {
        [name]: value,
      };
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.state.title && this.state.user) {
      this.props.onAdd(this.state.user, this.state.title);

      this.setState({
        title: '',
        user: '',
        errorUser: false,
        errorTitle: false,
      });
    }

    if (!this.state.user) {
      this.setState({
        errorUser: true,
      });
    }

    if (!this.state.title) {
      this.setState({
        errorTitle: true,
      });
    }
  }

  render() {
    return (
      <form>
        <input
          type="text"
          name="title"
          className="input"
          value={this.state.title}
          onChange={this.handleInput}
          placeholder="Title"
        />
        <select
          value={this.state.user}
          name="user"
          className="input"
          onChange={this.handleInput}
        >
          <option value="">
            Chose a user
          </option>
          {this.props.users.map(user => (
            <option
              value={user.name}
              key={user.id}
            >
              {user.name}
            </option>
          ))}
        </select>
        {this.state.errorUser && (
          <p>Please choose user!</p>
        )}
        {this.state.errorTitle && (
          <p>Please enter the title!</p>
        )}
        <button
          type="button"
          className="button"
          onClick={this.handleSubmit}
        >
          Add new Todo!
        </button>
      </form>
    );
  }
}

NewTodoForm.propTypes = {
  onAdd: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
};
