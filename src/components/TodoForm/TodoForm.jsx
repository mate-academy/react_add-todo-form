import React from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import './TodoForm.css';
import PropTypes from 'prop-types';

export class TodoFrom extends React.Component {
  state = {
    inputTodo: '',
    selectedUser: '',
    errorTodo: true,
    errorSelect: true,
    userID: 3,
  }

  inputForm = ({ target }) => (
    this.setState({ inputTodo: target.value })
  )

  submitButton = (event) => {
    event.preventDefault();
    const { usersData, addTodo } = this.props;
    const { inputTodo, selectedUser, userID } = this.state;
    const findUserId = name => usersData.find(user => user.name === name).id;

    if (!inputTodo.trim() || !selectedUser) {
      if (!inputTodo.trim()) {
        this.setState({ errorTodo: false });
        setTimeout(() => (this.setState({ errorTodo: true })), 2000);
      }

      if (!selectedUser) {
        this.setState({ errorSelect: false });
        setTimeout(() => (this.setState({ errorSelect: true })), 2000);
      }

      return;
    }

    this.setState(prevState => ({
      inputTodo: '',
      selectedUser: '',
      errorTodo: true,
      errorSelect: true,
      userID: prevState.userID + 1,
    }));

    addTodo({
      userId: findUserId(selectedUser),
      id: userID,
      title: inputTodo,
      completed: false,
      user: {
        name: selectedUser,
      },
    });
  }

  render() {
    const { usersData } = this.props;
    const { inputTodo, errorTodo, selectedUser, errorSelect } = this.state;

    return (
      <>
        <Form
          className="inform"
        >
          <div data-tip="Ex. - Clean the room">
            <input
              type="text"
              placeholder="input todo"
              className="inputTodo mr-3"
              value={inputTodo}
              onChange={this.inputForm}
            />
            <Alert
              variant="danger"
              className="todoAlert"
              hidden={errorTodo}
            >
              Please enter the Title
            </Alert>
          </div>
          <div data-tip="Ex. - Oliver Twist">
            <select
              name="users"
              id="users"
              className="mr-3"
              value={selectedUser}
              onChange={({ target }) => (
                this.setState({ selectedUser: target.value })
              )}
            >
              <option>Please choose a user</option>
              {usersData.map(user => (
                <option key={user.id}>{user.name}</option>
              ))}
            </select>
            <Alert
              variant="warning"
              className="selectAlert"
              hidden={errorSelect}
            >
              Please choose a User
            </Alert>
          </div>
          <div>
            <Button
              variant="info"
              type="submit"
              onClick={this.submitButton}
            >
              Add Todo
            </Button>
          </div>
        </Form>
      </>
    );
  }
}

TodoFrom.propTypes = {
  usersData: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    userName: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
    company: PropTypes.object,
    phone: PropTypes.string,
    website: PropTypes.string,
  })).isRequired,
  addTodo: PropTypes.func.isRequired,
};
