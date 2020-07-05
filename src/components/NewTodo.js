import React from 'react';
import PropTypes from 'prop-types';
import '../App.css';

class NewTodo extends React.Component {
  state = {
    user: '',
    title: '',
    warning: '',
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { todos, users, addTodo } = this.props;
    const { title, chooseUser } = event.target;

    if (title.value.length === 0) {
      this.setState({
        warning: 'Please enter the title',
      });

      return;
    }

    if (!chooseUser.value) {
      this.setState({
        warning: 'Please choose a user',
      });

      return;
    }

    if (!this.state.warning) {
      const newTodo = {
        id: todos.length + 1,
        title: title.value,
        userId: users[chooseUser.value].id,
        user: users[chooseUser.value],
        completed: false,
      };

      this.setState({
        title: '',
        user: '',
      });
      addTodo(newTodo);
    }
  };

  onChangeSelect = ({ target }) => {
    const { value } = target.value;

    this.setState({
      user: value,
      warning: null,
    });
  };

  onChangeInput = ({ target }) => {
    const { value } = target;

    this.setState({
      title: value,
      warning: null,
    });
  };

  render() {
    const { users } = this.props;
    const {
      title,
      user,
      warning,
    } = this.state;

    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div>
            <input
              className="form-control add-title"
              type="text"
              name="title"
              maxLength={50}
              placeholder="Add your title"
              value={title}
              onChange={this.onChangeInput}
            />
          </div>
          <div>
            <select
              className="form-control choose-user"
              id="chooseUser"
              value={user}
              name="chooseUser"
              onChange={this.onChangeSelect}
            >
              <option value="">Select a user</option>
              {users.map((userSelected, index) => (
                <option
                  key={userSelected.id}
                  value={index}
                >
                  {userSelected.name}
                </option>
              ))}
            </select>
            {warning && (
              <div className="warning">{warning}</div>
            )}
          </div>
          <button className="btn  btn-primary " type="submit">Add</button>
        </form>
      </div>
    );
  }
}

NewTodo.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
