import React from 'react';
import PropTypes from 'prop-types';
import users from '../api/users';

class TodoForm extends React.Component {
  state = {
    newTodoName: '',
    selectedUserId: 0,
    hasTodoError: false,
    hasUserError: false,
  };

  handlerTitleChange = (event) => {
    this.setState({ newTodoName: event.target.value });
  };

  handlerUserChange = event => this.setState(
    { selectedUserId: +event.target.value },
  );

  handlerFormSubmit = (event) => {
    event.preventDefault();
    const { addUser } = this.props;
    const { newTodoName, selectedUserId } = this.state;

    if (!newTodoName || !selectedUserId) {
      this.setState({
        hasTodoError: !newTodoName,
        hasUserError: !selectedUserId,
      });

      return;
    }

    addUser(newTodoName, selectedUserId);

    this.setState(() => (
      {
        newTodoName: '',
        selectedUserId: 0,
      }));
  };

  render() {
    const {
      newTodoName,
      selectedUserId,
      hasTodoError,
      hasUserError,
    } = this.state;

    const usersOption = users.map(
      user => <option value={user.id} key={user.id}>{user.name}</option>,
    );

    let classNameTodo = 'form-control ';

    classNameTodo += hasTodoError && ' is-invalid';

    let classNameUser = 'form-control ';

    classNameUser += hasUserError && ' is-invalid';

    return (
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <form onSubmit={this.handlerFormSubmit}>
            <div className="form-group">
              <label htmlFor="filter">Todo Info</label>
              <input
                type="text"
                id="filter"
                className={classNameTodo}
                onChange={this.handlerTitleChange}
                placeholder="Write here..."
                value={newTodoName}
                aria-describedby="emailHelp"
              />
              <div className="invalid-feedback">This field cannot be empty</div>
            </div>

            <div className="form-group">
              <label htmlFor="selectUser">User Info</label>
              <select
                id="selectUser"
                className={classNameUser}
                value={selectedUserId}
                onChange={this.handlerUserChange}
              >
                <option value="0">Please, choose a user</option>
                {usersOption}
              </select>
              <div className="invalid-feedback">Please, select a user.</div>
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
        </div>
      </div>
    );
  }
}

TodoForm.propTypes = {
  addUser: PropTypes.func,
};

TodoForm.defaultProps = {
  addUser: '',
};

export default TodoForm;
