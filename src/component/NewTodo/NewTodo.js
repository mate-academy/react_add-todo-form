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
        user: { name: 'notSelected' },
        completed: false,
      },
      isTitle: true,
      userSelected: true,
    };
  }

  handleTitleChange = (event) => {
    let val;
    const forbiden = /[^\s\w]/g;

    if (forbiden.test(event.target.value)
      || event.target.value.length > 25) {
      val = this.state.todo.title;
    } else {
      val = event.target.value;
    }

    this.setState(state => ({
      todo: {
        ...state.todo,
        title: val,
      },
      isTitle: val !== '',
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
          ? { name: 'notSelected' }
          : users.find(user => user.name === userName),
      },
      userSelected: userName !== 'notSelected',
    }
    ));
  }

  render() {
    const { users } = this.props;

    return (
      <form
        className="form"
        onSubmit={(event) => {
          event.preventDefault();

          if (this.state.todo.title === '') {
            this.setState({ isTitle: false });
          }

          if (this.state.todo.user.name === 'notSelected') {
            this.setState({ userSelected: false });
          }

          if (this.state.todo.title === ''
            || this.state.todo.user.name === 'notSelected') {
            return;
          }

          this.setState(state => ({ todo: {
            ...state.todo,
            title: '',
            id: state.todo.id + 1,
            user: { name: 'notSelected' },
          } }));

          this.props.onSubmit({ ...this.state.todo });
        }}
      >
        <legend>
          Input your todo
        </legend>
        <input
          placeholder="todo..."
          value={this.state.todo.title}
          onChange={this.handleTitleChange}
        />
        <span className="error-message">
          {this.state.isTitle ? '' : 'Please enter the title'}
        </span>
        <br />
        <select
          value={this.state.todo.user.name}
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
          {this.state.userSelected ? '' : 'Please choose a user'}
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
