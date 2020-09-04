import React from 'react';
import PropTypes from 'prop-types';

export class NewTodo extends React.Component {
  constructor(props) {
    super(props);

    const { id } = this.props;

    this.state = {
      todo: {
        title: '',
        id,
        userId: 1,
        user: null,
        completed: false,
      },
      isTitleEntered: true,
      isUserSelected: true,
    };
  }

  handleTitleChange = (event) => {
    let val;
    const forbiden = /[^\w]/g;

    if (forbiden.test(event.target.value)) {
      val = this.state.todo.title;
    } else {
      val = event.target.value;
    }

    this.setState(state => ({
      todo: {
        ...state.todo,
        title: val,
      },
      isTitleEntered: val !== '',
    }
    ));
  }

  handleSelectChange = (event) => {
    const { users } = this.props;
    const userName = event.target.value;

    this.setState(state => ({
      todo: {
        ...state.todo,
        user: userName === 'notSelected'
          ? null
          : users.find(user => user.name === userName),
      },
      isUserSelected: userName !== 'notSelected',
    }
    ));
  }

  render() {
    const { users } = this.props;
    const { todo, isTitleEntered, isUserSelected } = this.state;

    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();

          if (todo.title === '') {
            this.setState({ isTitleEntered: false });
          }

          if (!todo.user) {
            this.setState({ isUserSelected: false });
          }

          if (todo.title === '' || !todo.user) {
            return;
          }

          this.props.onSubmit({ ...todo });
          this.setState(state => ({ todo: {
            ...state.todo,
            title: '',
            id: state.todo.id + 1,
            user: null,
          } }));
        }}
      >
        <legend>
          Input your todo
        </legend>
        <input
          maxLength="10"
          placeholder="todo..."
          value={todo.title}
          onChange={this.handleTitleChange}
        />
        <span className="error-message">
          {isTitleEntered ? '' : 'Please enter the title'}
        </span>
        <br />
        <select
          value={todo.user ? todo.user.name : 'notSelected'}
          onChange={this.handleSelectChange}
        >
          <option value="notSelected">Select user...</option>
          {users.map(user => (
            <option value={user.name} key={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <span className="error-message">
          {isUserSelected ? '' : 'Please choose a user'}
        </span>
        <br />
        <button type="submit">
          Add Todo
        </button>
      </form>
    );
  }
}

NewTodo.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.number.isRequired,
};
