import React from 'react';
import PropTypes from 'prop-types';

class NewToDo extends React.Component {
  state = {
    title: '',
    id: this.props.id,
    userId: '',
    errorTitle: false,
    errorUser: false,
  }

  handleTitleNewTodo = (event) => {
    this.setState({
      title: event.target.value,
      errorTitle: false,
    });
  };

  handleChangeUser = (event) => {
    this.setState({
      userId: +event.target.value,
      errorUser: false,
    });
  };

  clearForm = () => {
    this.setState(state => ({
      title: '',
      userId: 0,
      id: state.id + 1,
    }));
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const { title, userId, id } = this.state;

    if (!title.trim()) {
      this.setState({
        errorTitle: true,
      });

      return;
    }

    if (!userId) {
      this.setState({
        errorUser: true,
      });

      return;
    }

    const newTodo = {
      userId,
      title,
      id,
      person: this.props.users.find(user => userId === user.id),
    };

    this.props.addNewTodo(newTodo);

    this.clearForm();
  }

  render() {
    const { users } = this.props;
    const { title, userId, errorUser, errorTitle } = this.state;

    return (
      <form onSubmit={this.handleSubmit} className="form__newTodo">
        <label>
          TODO TITLE:
          <input
            className="form__field"
            type="text"
            value={title}
            maxLength={100}
            onChange={this.handleTitleNewTodo}
          />
          {errorTitle
            ? <div className="form__messageError">Please Enter The Title</div>
            : ''}
        </label>
        <label>
          PERSON:
          <select
            className="form__field"
            value={userId}
            onChange={this.handleChangeUser}
          >
            <option value={' '} />
            {users.map(user => (
              <option
                key={user.id}
                value={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
          {errorUser
            ? <div className="form__messageError">Please Make Your Choice</div>
            : ''}
        </label>
        <button type="submit" className="form__button">
          ADD
        </button>
      </form>
    );
  }
}

NewToDo.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  addNewTodo: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default NewToDo;
