/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

const [titleMsg, nameMsg, wrongMsg] = ['Please enter the title', 'Please choose a user', 'Incorrect input'];

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
      const errors = {};
      const titleInput = new RegExp(/^[\w\s]+$/);

      if (!titleInput.test(title)) {
        errors.title = wrongMsg;
      }

      if (!title) {
        errors.title = titleMsg;
      }

      if (name === 'Choose a user') {
        errors.name = nameMsg;
      }

      if (Object.values(errors).length) {
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
