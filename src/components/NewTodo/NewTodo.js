import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { userShape } from '../../shapes/userShape';
import './NewTodo.css';

export class NewTodo extends React.Component {
  state = {
    title: '',
    titleInputError: false,
    userId: 0,
    userSelectError: false,
    todoMaxId: this.props.maxId,
  };

  handleInputChange = (event) => {
    this.setState({
      titleInputError: false,
      title: event.target.value.trimLeft().replace(/[^\s\w]/g, ''),
    });
  };

  handleUserChange = (event) => {
    this.setState({
      userSelectError: false,
      userId: +event.target.value,
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    this.setState((prevState) => {
      if (prevState.title && prevState.userId) {
        const { users } = this.props;

        this.props.addTodo({
          userName: users.find(
            user => user.id === prevState.userId,
          ).name,
          id: prevState.todoMaxId + 1,
          title: prevState.title,
          completed: false,
        });

        return ({
          title: '',
          userId: 0,
          titleInputError: false,
          userSelectError: false,
          todoMaxId: prevState.todoMaxId + 1,
        });
      }

      return ({
        titleInputError: !prevState.title,
        userSelectError: !prevState.userId,
      });
    });
  };

  render() {
    const { title, titleInputError, userId, userSelectError } = this.state;
    const { users } = this.props;

    return (
      <form className="form" onSubmit={this.handleFormSubmit}>
        <div className="form__field">
          <input
            className={
              `form__input ${titleInputError && 'form__input--error'}`
            }
            type="text"
            placeholder="Enter your todo"
            value={title}
            maxLength={40}
            onChange={this.handleInputChange}
          />
          {
            titleInputError
            && <ErrorMessage message="Please enter the title" />
          }
        </div>
        <div className="form__field">
          <select
            className={
              `form__input ${userSelectError && 'form__input--error'}`
            }
            value={userId}
            onChange={this.handleUserChange}
          >
            <option value={0}>Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          {
            userSelectError
            && <ErrorMessage message="Please choose a user" />
          }
        </div>
        <button className="form__submit" type="submit">Add</button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  maxId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(userShape).isRequired,
  addTodo: PropTypes.func.isRequired,
};
