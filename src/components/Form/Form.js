/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prefer-stateless-function
export class Form extends React.Component {
    state = {
      title: '',
      name: 'Choose a user',
      error: {},
      maxLength: 30,
    }

    handleChange = (event) => {
      const { name, value } = event.target;
      const errors = {};

      this.setState({
        [name]: value,
      });
      errors[name] = '';
      this.setState({ error: errors });
    }

    handleSubmit = (event) => {
      event.preventDefault();
      this.validateInput();
    }

    creatTodo = () => {
      const { users, currentTodoID } = this.props;

      return {
        userId: users.find(user => user.name === this.state.name).id,
        id: currentTodoID + 1,
        title: this.state.title,
        name: this.state.name,
      };
    }

    clearForm = () => {
      this.setState({
        title: '',
        name: '',
      });
    }

    validateInput = () => {
      const { title, name } = this.state;
      const [titleMsg, nameMsg, wrongMsg] = ['Please enter the title', 'Please choose a user', 'Incorrect input'];
      const errors = {};
      const regex = new RegExp(/^[\w\s]+$/);
      let isError = false;

      if (!regex.test(title)) {
        errors.title = wrongMsg;
        isError = true;
      }

      if (!title) {
        errors.title = titleMsg;
        isError = true;
      }

      if (name === 'Choose a user') {
        errors.name = nameMsg;
        isError = true;
      }

      if (isError) {
        this.setState({ error: errors });

        return;
      }

      const newTodo = this.creatTodo();

      this.props.addTodo(newTodo);
      this.clearForm();
    }

    render() {
      const { users } = this.props;
      const { maxLength } = this.state;

      return (
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="search-title">
              Enter Title
            </label>
            <div>
              <input
                type="text"
                id="search-title"
                placeholder="Enter title"
                name="title"
                maxLength={maxLength}
                value={this.state.title}
                onChange={this.handleChange}
              />

              { this.state.title ? (
                <span>
                  (
                  { maxLength - this.state.title.length }
                  /
                  { maxLength }
                  )
                </span>
              ) : null }

              <span className="error">{this.state.error.title}</span>
            </div>
          </div>
          <select
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          >
            <option
              value="Choose a user"
            >
              Choose a user
            </option>
            {[...users].map(user => (
              <option
                key={user.id}
                value={user.name}
              >
                {user.name}
              </option>
            ))}
          </select>
          <span className="error">{this.state.error.name}</span>
          <div>
            <input type="submit" value="Add" className="add" />
          </div>
        </form>
      );
    }
}

Form.propTypes = {
  addTodo: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  currentTodoID: PropTypes.number.isRequired,

};
