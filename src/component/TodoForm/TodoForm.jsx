import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export class TodoForm extends React.Component {
  state = {
    user: '',
    title: '',
  }

  handleTodos = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
    this.props.handleError(name, value);
  }

  render() {
    const {
      usersList,
      handleChange,
    } = this.props;

    const {
      user,
      title,
    } = this.state;

    return (
      <form className="block-form">
        <textarea
          className="block-form__text"
          type="text"
          name="title"
          placeholder="Please, enter the text"
          value={title}
          onChange={this.handleTodos}
        />
        <select
          className="block-form__list-person"
          name="user"
          value={user}
          onChange={this.handleTodos}
        >
          <option
            value=""
            disabled
          >
            Please select a user
          </option>
          {usersList.map(person => (
            <option key={person.name}>
              {person.name}
            </option>
          ))}
        </select>
        <button
          className="btn btn-outline-info"
          type="button"
          onClick={() => {
            handleChange(user, title);
            if (user && title.length > 10) {
              this.setState({
                user: '',
                title: '',
              });
            }
          }}
        >
          Add todo
        </button>
      </form>
    );
  }
}

TodoForm.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
};
