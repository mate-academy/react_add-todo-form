import React from 'react';
import PropTypes from 'prop-types';
import './todoForm.css';
import { TodoList } from '../TodoList';

export class TodoForm extends React.Component {
  state = {
    usersTodos: [...this.props.usersTodos],
    inputValue: '',
    selectValue: 'Choose a user',
    titleValidation: false,
    userValidation: false,
  }

  inputHandler = (event) => {
    this.setState({
      inputValue: event.target.value,
      titleValidation: false,
      userValidation: this.state.userValidation,
    });
  }

  selectHandler = (event) => {
    this.setState({
      selectValue: event.target.value,
      titleValidation: this.state.titleValidation,
      userValidation: false,
    });
  }

  buttonHandler = (event) => {
    event.preventDefault();

    const {
      usersTodos,
      inputValue,
      selectValue,
    } = this.state;

    if (inputValue.length > 0 && selectValue !== 'Choose a user') {
      this.setState({
        usersTodos: [
          ...usersTodos,
          {
            id: usersTodos.length + 1,
            title: inputValue,
            user: {
              name: selectValue,
            },
            completed: false,
          },
        ],

        inputValue: '',
        selectValue: 'Choose a user',
        titleValidation: false,
        userValidation: false,
      });
    } else if (inputValue.length === 0 && selectValue === 'Choose a user') {
      this.setState({
        titleValidation: true,
        userValidation: true,
      });
    } else if (inputValue.length === 0) {
      this.setState({
        titleValidation: true,
        userValidation: false,
      });
    } else if (selectValue === 'Choose a user') {
      this.setState({
        titleValidation: false,
        userValidation: true,
      });
    }
  }

  render() {
    const {
      usersTodos,
      inputValue,
      selectValue,
      titleValidation,
      userValidation
    } = this.state;

    return (
      <>
        <form
          className="form"
          onSubmit={this.buttonHandler}
        >
          <input
            type="text"
            placeholder="Please enter the text"
            value={inputValue}
            className="form__input"
            onChange={this.inputHandler}
          />
          <select
            value={selectValue}
            className="form__select"
            onChange={this.selectHandler}
          >
            <option value="Choose a user" disabled>Choose a user</option>
            {
              this.props.initialUsers.map(user => (
                <option value={user.name} key={user.id}>{user.name}</option>
              ))
            }
          </select>
          <button
            className="form__button"
            type="submit"
          >
            Add Todo
          </button>
          <div className="form__validation">
            <span className="form__validation-text">
              {
                titleValidation
                && 'Please enter the title'
              }
            </span>
            {' '}
            <span className="form__validation-text">
              {
                userValidation
                && 'Please choose a user'
              }
            </span>
          </div>
        </form>
        <TodoList
          usersTodos={usersTodos}
        />
      </>
    );
  }
}

TodoForm.propTypes = {
  usersTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
      todo: PropTypes.bool.isRequired,
    }),
  ).isRequired,
};

TodoForm.propTypes = {
  initialUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
