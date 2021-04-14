import React from 'react';

class TodoForm extends React.Component {
  state = {
    currentValue: null,
    currentUser: null,
    currentStatus: false,
    errorInput: false,
    errorSelect: false,
  }

  handleInput = (event) => {
    const letter = event.target.value.replace(/^ /, '')
    this.setState({ currentValue: letter });
    this.validationCheck();
  }

  validationCheck = () => {
    const { errorInput, currentValue } = this.state;

    if (errorInput && currentValue && currentValue.length >= 3) {
      this.setState({ errorInput: false });
    }
  }

  chooseStatusTodo = () => {
    this.setState(state => ({ currentStatus: !state.currentStatus }));
  }

  choosePerformer = (event) => {
    const selectUser = this.props.users
      .find(user => user.id === +event.target.value);

    this.setState({ currentUser: selectUser.id });
  }

  resetState = () => {
    this.setState(() => ({
      currentValue: null,
      currentUser: null,
      currentStatus: false,
      errorInput: false,
      errorSelect: false,
    }));
  }

  validation = () => {
    const {
      currentValue, currentUser,
      currentStatus,
    } = this.state;

    if ((typeof currentValue === 'string'
      && currentValue.length >= 4)
      && (typeof currentUser === 'number')
      && (typeof currentStatus === 'boolean')) {
      this.addNewTodo();
    }

    if (typeof currentValue !== 'string'
      || currentValue.length <= 3) {
      this.setState(() => ({ errorInput: true }));
    }

    if (typeof currentUser !== 'number') {
      this.setState(() => ({ errorSelect: true }));
    }
  }

  addNewTodo = () => {
    const {
      currentValue, currentUser,
      currentStatus,
    } = this.state;
    const { users, addTodo, nextId } = this.props;
    const newCreateTask = {
      userId: currentUser,
      id: nextId,
      title: currentValue,
      completed: currentStatus,
      executant: users
        .find(user => user.id === currentUser),
    };

    this.resetState();
    addTodo(newCreateTask);
  }

  checkSelectError = () => {
    const { currentUser, errorSelect } = this.state;

    if (errorSelect && currentUser !== null) {
      this.setState(() => ({ errorSelect: false }));
    }
  }

  render() {
    const { users } = this.props;
    const {
      currentValue, currentUser,
      currentStatus, errorSelect, errorInput,
    } = this.state;

    this.checkSelectError();

    return (
      <form
        className="todo__form form"
        onSubmit={(e) => {
          e.preventDefault();
          this.validation();
        }}
      >
        <div className="form__wrap">
          <label htmlFor="newTask">Write a new task: </label>
          <input
            type="text"
            id="newTask"
            value={currentValue || ''}
            onChange={this.handleInput}
          />
        </div>
        <div className="form__wrap">
          <label htmlFor="chooseUser">Choose a user: </label>
          <select
            id="chooseUser"
            value={currentUser || ''}
            onChange={this.choosePerformer}
          >
            <option value="" hidden>
              Choose here
            </option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form__wrap">
          <label htmlFor="chooseStatus">Select status for new todo: </label>
          <input
            type="checkbox"
            id="chooseStatus"
            className="chooseStatus"
            checked={currentStatus}
            onClick={this.chooseStatusTodo}
          />
        </div>
        <button
          type="button"
          onClick={this.validation}
        >
          Add todo
        </button>
        {errorInput && (
          <p className="form__hint">
            Please, write 4 or more symbols
          </p>
        )}
        {errorSelect && (
          <p className="form__hint2">
            Please, select both field
          </p>
        )}
      </form>
    );
  }
}

export default TodoForm;
