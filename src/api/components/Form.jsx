import React from 'react';
import PropTypes from 'prop-types';
import './Form.css';

export class Form extends React.Component {
  state = {
    title: '',
    userName: '',
    classValidTitle: '',
    classValidUser: '',
    todoList: [],
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevState.todoList !== this.state.todoList) {
      this.props.updateTodoList(this.state.todoList);
    }
  }

  userNameHandler = (e) => {
    const { name, value } = e.target;

    this.setState({
      [name]: value,
      classValidUser: '',
      classValidTitle: '',
    });
  }

  addUserToList = (e) => {
    e.preventDefault();

    if (!this.state.userName) {
      this.setState({ classValidUser: 'showUser' });

      return;
    }

    if (!this.state.title) {
      this.setState({ classValidTitle: 'showTitle' });

      return;
    }

    this.setState(state => ({
      todoList: [
        ...state.todoList,
        {
          title: state.title,
          name: state.userName,
          id: state.todoList.length + 1,
        },
      ],
      title: '',
      userName: '',
    }));
  }

  render() {
    const { users } = this.props;
    const {
      title,
      userName,
      classValidTitle,
      classValidUser,
    } = this.state;

    return (
      <div className="form-style-6">
        <form
          onSubmit={this.addUserToList}
        >
          <h1>Add Todo form</h1>
          <p>
            <span>Users: </span>
            {users.length}
          </p>
          <select
            name="userName"
            onChange={this.userNameHandler}
            value={userName}
          >
            <option name="userName">Please select User...</option>
            {users.map(el => <option key={el.id}>{el.name}</option>)}
          </select>
          <p
            className={`validation ${classValidUser}`}
          >
            Please choose a user
          </p>
          <input
            onChange={this.userNameHandler}
            name="title"
            type="text"
            placeholder="Write a title..."
            maxLength={64}
            value={title}
          />
          <p
            className={`validation ${classValidTitle}`}
          >
            Please enter the title
          </p>
          <input
            type="submit"
            value="Add"
          />
        </form>
      </div>
    );
  }
}

Form.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateTodoList: PropTypes.func.isRequired,
};
