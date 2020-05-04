import React from 'react';
import PropTypes from 'prop-types';
import './NewTodo.css';

class NewTodo extends React.Component {
  state = {
    counterTodoId: 2,
    title: '',
    completed: 'In process',
    user: {
      name: 'Choose a performer',
    },

    titleError: false,
    userError: false,
  };

  handleSubmit = (event) => {
    event.preventDefault();

    const todo = {
      id: this.state.counterTodoId + 1,
      completed: this.state.completed,
      title: this.state.title,
      user: { name: this.state.user.name },
    };

    if (this.hasError()) {
      return;
    }

    this.props.addTodo(todo);
    this.clearTodo();
  };

  handleTitle = ({ target }) => {
    this.setState({
      title: target.value.trim(),
      titleError: false,
    });
  };

  handleUser = ({ target }) => {
    this.setState({
      user: { name: target.value },
      userError: false,
    });
  };

  handleStatus = ({ target }) => {
    this.setState({
      completed: target.value,
    });
  };

  hasError = () => {
    if (!this.state.title) {
      this.setState({
        titleError: true,
      });
    }

    if (this.state.user.name === 'Choose a performer') {
      this.setState({
        userError: true,
      });
    }

    if (!this.state.title || this.state.user.name === 'Choose a performer') {
      return true;
    }

    return false;
  }

  clearTodo = () => {
    if (this.hasError()) {
      return;
    }

    this.setState(prevState => ({
      counterTodoId: prevState.counterTodoId + 1,
      title: '',
      completed: 'In process',
      user: {
        name: 'Choose a performer',
      },
    }));
  }

  render() {
    const { performers } = this.props;
    const { titleError } = this.state;
    const { userError } = this.state;

    return (
      <div className="wrapper">
        <form
          onSubmit={this.handleSubmit}
          className="form"
        >
          <label className="label">
            Write a new task:
            <input
              className="form__item"
              type="text"
              value={this.state.title}
              onChange={this.handleTitle}
              placeholder="task"
            />
          </label>
          { titleError
            && (
              <div className="error">
                Please enter the title
              </div>
            )
          }
          <label className="label">
            Choose a performer:
            <select
              className="form__item"
              value={this.state.user.name}
              onChange={this.handleUser}
            >
              <option hidden>Choose a performer</option>
              {performers.map(performer => (
                <option key={performer.id}>{performer.name}</option>
              ))}
            </select>
          </label>
          {
            userError
            && (
              <div className="error">
                Choose a performer
              </div>
            )
          }
          <label className="label">
            Select status for new todo:
            <select
              className="form__item"
              value={this.state.completed}
              onChange={this.handleStatus}
            >
              <option>Done</option>
              <option>In process</option>
            </select>
          </label>

          <button
            type="submit"
            className="form__item btn"
            onClick={this.madeTodo}
          >
            Add todo
          </button>
        </form>
      </div>
    );
  }
}

NewTodo.propTypes = {
  performers: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
  addTodo: PropTypes.func.isRequired,
};

export default NewTodo;
