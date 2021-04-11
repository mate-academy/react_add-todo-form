import React from 'react';
import PropTypes from 'prop-types';

export class TodoForm extends React.Component {
  state = {
    user: '',
    title: '',
    titleValidation: false,
    userValidation: false,
  }

  handleError = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });

    if (name === 'title' && value.length > 10) {
      this.setState({
        titleValidation: false,
      });
    }

    if (name === 'user' && value) {
      this.setState({
        userValidation: false,
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
        titleValidation: true,
        userValidation: true,
      });

      return;
    }

    if (!title || title.length < 10) {
      this.setState({ titleValidation: true });

      return;
    }

    if (!user) {
      this.setState({ userValidation: true });

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
      titleValidation,
      userValidation,
    } = this.state;

    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              type="text"
              name="title"
              placeholder="Please, enter the text"
              value={title}
              onChange={this.handleError}
            />

            {titleValidation
              && (
                <span>
                  Please enter the title
                  {' '}
                  <br />
                  {' '}
                  (at least 10 characters)
                </span>
              )
            }
          </div>

          <div>
            <select
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
              {
                usersList.map(person => (
                  <option key={person.name}>
                    {person.name}
                  </option>
                ))
              }
            </select>

            {userValidation
              && (
                <span>
                  Please choose a user
                </span>
              )}
          </div>

          <button>
            Add todo
          </button>
        </form>
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
