import React from 'react';
import PropTypes from 'prop-types';
import './TodoForm.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

export class TodoForm extends React.Component {
  state = {
    user: '',
    title: '',
    errorTitle: false,
    errorUser: false,
  }

  handleError = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });

    if (name === 'title' && value.length > 10) {
      this.setState({
        errorTitle: false,
      });
    }

    if (name === 'user' && value) {
      this.setState({
        errorUser: false,
      });
    }
  }

  handleTodos = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { title, user } = this.state;

    if (title.length < 10 && !user) {
      this.setState({
        errorTitle: true,
        errorUser: true,
      });

      return;
    }

    if (!title || title.length < 10) {
      this.setState({ errorTitle: true });

      return;
    }

    if (!user) {
      this.setState({ errorUser: true });

      return;
    }

    this.props.handleChange(user, title);
    if (user && title.length > 10) {
      this.setState({
        user: '',
        title: '',
      });
    }
  }

  render() {
    const {
      usersList,
    } = this.props;

    const {
      user,
      title,
      errorTitle,
      errorUser,
    } = this.state;

    return (
      <>
        <form
          className="block-form"
          onSubmit={this.handleSubmit}
        >
          <textarea
            className="block-form__text"
            type="text"
            name="title"
            placeholder="Please, enter the text"
            value={title}
            onChange={this.handleError}
          />
          <select
            className="block-form__list-person"
            name="user"
            value={user}
            onChange={this.handleError}
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
            type="submit"
          >
            Add todo
          </button>
        </form>
        <section className="app__error-inner">
          {errorTitle
              && (
              <span
                className="app__error-title"
              >
                Please enter the title (at least 10 characters)
              </span>
              )
            }
          {errorUser
              && (
              <span
                className="app__error-user"
              >
                Please choose a user
              </span>
              )}
        </section>
      </>
    );
  }
}

TodoForm.propTypes = {
  usersList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
};
