import PropTypes from 'prop-types';
import React from 'react';

class NewTodo extends React.Component {
  state = {
    titleInput: '',
    userSelected: '',
    userError: false,
    titleError: false,
    id: 3,
    users: [...this.props.userList],
  };

  handleInputChange = (event) => {
    this.setState({
      titleInput: event.target.value.replace(/[^\s\w]/g, ''),
      titleError: false,
    });
  };

  handleUserSelect = (event) => {
    this.setState({ userSelected: event.target.value, userError: false });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const { id } = this.state;

    this.setState(({ userSelected, titleInput, users }) => {
      if (!userSelected && !titleInput) {
        return { titleError: true, userError: true };
      }

      if (!titleInput) {
        return { titleError: true };
      }

      if (!userSelected) {
        return { userError: true };
      }

      const { addTodo } = this.props;
      const user = users.find(person => person.name === userSelected);

      addTodo({
        userId: user.id,
        id,
        title: titleInput,
        user,
      });

      return { titleInput: '', userSelected: '', id: id + 1 };
    });
  };

  render() {
    const { titleInput, userSelected, userError, titleError, users }
    = this.state;

    return (
      <>
        <form
          className="form"
          onSubmit={this.handleSubmit}
        >
          <div className="form__field">
            <input
              className="form__input form__input_select"
              type="text"
              value={titleInput}
              placeholder="What else needs to be done?"
              maxLength={30}
              onChange={this.handleInputChange}
            />
            {titleError
              ? (
                <span className="form__error">
                  Please enter the title
                </span>
              ) : ''}
          </div>
          <div className="form__field">
            <select
              className="form__input"
              onChange={this.handleUserSelect}
              value={userSelected}
            >
              {<option value="">Choose the user</option>}
              {users.map(({ name }) => (
                <option key={name}>{name}</option>
              ))}
            </select>
            {userError
              ? (
                <span className="form__error">Please choose a user</span>
              ) : ''}
          </div>

          <button
            className="button"
            type="submit"
          >
            Add
          </button>
        </form>
      </>
    );
  }
}

NewTodo.propTypes = {
  userList: PropTypes
    .arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
